/* =====================================================================
   JOURNEY BEGIN — ADMIN PANEL
   Handles: Firebase Auth login/logout, admin authorization check, and
   generic CRUD screens for every content collection used by the public
   site (manga, chapters, characters, locations, lore, gallery, news).
   ===================================================================== */

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fb = window.jbFirebase;
  if (!fb) {
    alert('Firebase failed to load. Check your internet connection and that firebase-config.js is present.');
    return;
  }
  const auth = fb.auth;
  const db = fb.db;

  /* =====================================================================
     IMAGE COMPRESSION (client-side, no Firebase Storage / billing needed)
     Resizes + re-encodes an uploaded file to a JPEG/PNG data URL small
     enough to store safely as a Firestore field, iterating down in
     quality/size until it fits under maxBytes (approx, based on string
     length since base64 ~= actual byte count for our purposes).
  ===================================================================== */
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawToDataURL(img, maxDim, quality, mime) {
    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL(mime, quality);
  }

  async function fileToSafeDataURL(file, maxBytes = 700000) {
    const raw = await readFileAsDataURL(file);
    const img = await loadImage(raw);
    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    let maxDim = 1600;
    let quality = 0.82;
    let dataUrl = drawToDataURL(img, maxDim, quality, mime);

    let attempts = 0;
    while (dataUrl.length > maxBytes && attempts < 6) {
      quality = Math.max(0.4, quality - 0.12);
      maxDim = Math.round(maxDim * 0.85);
      dataUrl = drawToDataURL(img, maxDim, quality, mime);
      attempts++;
    }
    return dataUrl;
  }

  /* =====================================================================
     TOAST
  ===================================================================== */
  function toast(msg, isError = false) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.toggle('error', isError);
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), isError ? 6000 : 2600);
  }

  /* =====================================================================
     COLLECTION SCHEMA
     idField: 'slug'  -> admin chooses the document ID (must match the ids
              referenced elsewhere, e.g. manga.id used by chapters.manga)
     idField: null    -> Firestore auto-generates the document ID
  ===================================================================== */
  const COLLECTIONS = {
    manga: {
      label: 'Manga',
      idField: 'slug',
      idHint: 'Lowercase, dash-separated — e.g. eternity-of-crystal. This id is referenced by Chapters.',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'author', label: 'Author', type: 'text' },
        { key: 'genre', label: 'Genre', type: 'text' },
        { key: 'status', label: 'Status', type: 'select', options: ['Ongoing', 'Coming Soon', 'Completed'] },
        { key: 'chapters', label: 'Chapter Count', type: 'number' },
        { key: 'featured', label: 'Featured on homepage', type: 'checkbox' },
        { key: 'cover', label: 'Cover Image', type: 'image', folder: 'manga' },
        { key: 'description', label: 'Description', type: 'textarea', full: true }
      ],
      columns: ['title', 'genre', 'status', 'chapters']
    },
    chapters: {
      label: 'Chapters',
      idField: null,
      fields: [
        { key: 'manga', label: 'Manga id (must match a Manga slug)', type: 'text', required: true },
        { key: 'arc', label: 'Arc Name (optional — groups chapters on the homepage)', type: 'text' },
        { key: 'number', label: 'Chapter Number', type: 'number', required: true },
        { key: 'title', label: 'Chapter Title', type: 'text' },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'Coming Soon', 'Upcoming'] },
        { key: 'releaseAt', label: 'Unlocks At (only used when Status = Upcoming)', type: 'datetime', showIf: { key: 'status', equals: 'Upcoming' } },
        { key: 'pageImages', label: 'Chapter Pages (upload in reading order)', type: 'image-list', folder: 'chapters', full: true },
        { key: 'pages', label: 'Page Count (only used if you are not uploading pages above — see README)', type: 'number' }
      ],
      columns: ['manga', 'arc', 'number', 'title', 'status', 'pages']
    },
    characters: {
      label: 'Characters',
      idField: 'slug',
      idHint: 'Lowercase, dash-separated — e.g. felix.',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'age', label: 'Age', type: 'text' },
        { key: 'image', label: 'Portrait Image', type: 'image', folder: 'characters' },
        { key: 'short', label: 'Short Bio (card preview)', type: 'textarea' },
        { key: 'full', label: 'Full Bio (modal)', type: 'textarea', full: true },
        { key: 'traits', label: 'Traits (comma separated)', type: 'list' }
      ],
      columns: ['name', 'age']
    },
    locations: {
      label: 'World Map',
      noEntries: true,
      mapPicker: true,
      fields: []
    },
    lore: {
      label: 'Lore',
      idField: 'slug',
      idHint: 'Lowercase, dash-separated — e.g. crystals.',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'body', label: 'Body', type: 'textarea', full: true }
      ],
      columns: ['title']
    },
    gallery: {
      label: 'Gallery',
      idField: null,
      fields: [
        { key: 'category', label: 'Category', type: 'select', options: ['pages', 'characters', 'concept', 'maps'] },
        { key: 'src', label: 'Image', type: 'image', folder: 'gallery' },
        { key: 'caption', label: 'Caption', type: 'text' }
      ],
      columns: ['category', 'caption']
    },
    news: {
      label: 'News',
      idField: null,
      fields: [
        { key: 'tag', label: 'Tag', type: 'text' },
        { key: 'date', label: 'Date (e.g. Aug 20, 2026)', type: 'text' },
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'desc', label: 'Description', type: 'textarea', full: true }
      ],
      columns: ['date', 'tag', 'title']
    },
    social: {
      label: 'Social Media',
      noEntries: true,
      socialPicker: true,
      fields: []
    }
  };

  /* =====================================================================
     SOCIAL MEDIA PLATFORMS — shown as icon buttons on the main site.
     Leave any field blank in the admin form to hide that platform's icon.
  ===================================================================== */
  const SOCIAL_PLATFORMS = [
    { key: 'telegram',  label: 'Telegram',    placeholder: 'https://t.me/yourchannel' },
    { key: 'whatsapp',  label: 'WhatsApp',    placeholder: 'https://wa.me/1234567890' },
    { key: 'discord',   label: 'Discord',     placeholder: 'https://discord.gg/yourinvite' },
    { key: 'instagram', label: 'Instagram',   placeholder: 'https://instagram.com/yourhandle' },
    { key: 'facebook',  label: 'Facebook',    placeholder: 'https://facebook.com/yourpage' },
    { key: 'x',         label: 'X (Twitter)', placeholder: 'https://x.com/yourhandle' },
    { key: 'youtube',   label: 'YouTube',     placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'tiktok',    label: 'TikTok',      placeholder: 'https://tiktok.com/@yourhandle' },
    { key: 'website',   label: 'Website / Other', placeholder: 'https://yourdomain.com' }
  ];

  /* =====================================================================
     DEFAULT SEED DATA — same content the site ships with, used only by
     the "Import starter content" button on an empty collection.
  ===================================================================== */
  const DEFAULTS = {
    manga: [
      { slug: 'eternity-of-crystal', title: 'Eternity of Crystal', author: 'Vishva & Mathavan', genre: 'Fantasy · Adventure · Mystery', status: 'Ongoing', chapters: 2, featured: true, cover: 'assets/manga/eternity-of-crystal/cover.jpg', description: 'An extraordinary journey begins in a world of crystals, kingdoms, mysteries and destiny.' },
      { slug: 'ashen-vow', title: 'Ashen Vow', author: 'Journey Begin Studio', genre: 'Dark Fantasy · Drama', status: 'Coming Soon', chapters: 0, featured: false, cover: 'assets/manga/ashen-vow/cover.jpg', description: 'A fallen knight seeks redemption in a kingdom built on ash and broken oaths.' },
      { slug: 'silver-static', title: 'Silver Static', author: 'Journey Begin Studio', genre: 'Sci-Fi · Mystery', status: 'Coming Soon', chapters: 0, featured: false, cover: 'assets/manga/silver-static/cover.jpg', description: 'In a city powered by memory, one signal refuses to be erased.' }
    ],
    chapters: [
      { manga: 'eternity-of-crystal', number: 1, title: 'Tale of Crystals', status: 'Available', pages: 6 },
      { manga: 'eternity-of-crystal', number: 2, title: 'The Silver Kingdom', status: 'Available', pages: 5 },
      { manga: 'eternity-of-crystal', number: 3, title: 'Echoes of Albia', status: 'Coming Soon', pages: 0 }
    ],
    characters: [
      { slug: 'felix', name: 'Felix', age: '17', image: 'assets/characters/felix.jpg', short: 'A determined wanderer bound to the crystal’s first awakening.', full: 'Felix carries a fragment of the Eternity Crystal without knowing why he was chosen. Quick-tempered but fiercely loyal, he is the story’s reluctant compass — pulled toward a destiny far larger than the quiet life he once wanted.', traits: ['Crystal-bound', 'Impulsive', 'Loyal'] },
      { slug: 'richard', name: 'Richard', age: '17', image: 'assets/characters/richard.jpg', short: 'Felix’s closest ally, sharp-minded and quietly protective.', full: 'Richard balances the group with calculation where Felix acts on instinct. Raised among scholars, he reads the world in patterns and prophecy — and is often the first to sense when something ancient has stirred.', traits: ['Strategist', 'Guarded', 'Scholar'] },
      { slug: 'albia', name: 'Albia', age: '15–16', image: 'assets/characters/albia.jpg', short: 'A quiet presence with a fractured connection to the old kingdoms.', full: 'Albia speaks little, but the crystals seem to answer when she is near. Her past is tangled with the fall of a kingdom no one else remembers, and every chapter peels back another layer of what she was made to carry.', traits: ['Mysterious', 'Empathic', 'Kingdom-born'] },
      { slug: 'cyrus', name: 'Cyrus', age: '17', image: 'assets/characters/cyrus.jpg', short: 'Charismatic, restless, and always first into danger.', full: 'Cyrus fights first and asks questions later — a habit that has saved the group as often as it’s endangered them. Beneath the bravado is someone still learning what it costs to protect people he loves.', traits: ['Reckless', 'Charismatic', 'Protector'] },
      { slug: 'ivo', name: 'Ivo', age: '24–27', image: 'assets/characters/ivo.jpg', short: 'An enigmatic elder who knows more than he admits.', full: 'Ivo appears exactly when the group needs guidance — and vanishes just as easily. His knowledge of the crystals runs deeper than any living record should allow, and his motives remain the story’s quietest mystery.', traits: ['Enigmatic', 'Elder', 'Untrusted'] }
    ],
    lore: [
      { slug: 'crystals', title: 'Crystals', body: 'The crystals are shards of a single, ancient formation shattered at the dawn of the current age. Each fragment resonates with a different aspect of will, memory, or fate — and each one chooses its bearer, not the other way around.' },
      { slug: 'crystal-powers', title: 'Crystal Powers', body: 'No two crystal-bonds manifest the same power twice. Recorded effects range from accelerated instinct and clairvoyant flashes to the ability to fracture solid stone with a touch — but every power exacts a cost proportional to its strength.' },
      { slug: 'kingdoms', title: 'Kingdoms', body: 'Three kingdoms once shared an uneasy peace over the crystal fields: the Silver Kingdom, the lost realm beneath Ashfall, and a third whose name has been deliberately erased from every surviving record.' },
      { slug: 'weapons', title: 'Weapons', body: 'Crystal-forged weapons are rare and dangerous, drawing power directly from their wielder’s bond. Most were destroyed after the Sundering; the few that remain are hunted by kingdoms and scavengers alike.' },
      { slug: 'ancient-history', title: 'Ancient History', body: 'Long before the current kingdoms, a single empire is said to have controlled the whole of the crystal fields. Its fall — the Sundering — scattered both the crystals and the truth of what caused it.' },
      { slug: 'mysteries', title: 'Mysteries', body: 'Why crystals choose their bearers, what Ivo truly is, and what waits at the center of the Crystal Spire remain unanswered. Journey Begin will unravel these slowly, one chapter at a time.' }
    ],
    gallery: [
      { category: 'pages', src: 'assets/gallery/page-01.jpg', caption: 'Chapter 1 — Page 3' },
      { category: 'pages', src: 'assets/gallery/page-02.jpg', caption: 'Chapter 1 — Page 5' },
      { category: 'characters', src: 'assets/gallery/felix-art.jpg', caption: 'Felix — Character Art' },
      { category: 'characters', src: 'assets/gallery/albia-art.jpg', caption: 'Albia — Character Art' },
      { category: 'concept', src: 'assets/gallery/concept-spire.jpg', caption: 'Concept — The Crystal Spire' },
      { category: 'concept', src: 'assets/gallery/concept-kingdom.jpg', caption: 'Concept — Silver Kingdom Gate' },
      { category: 'maps', src: 'assets/gallery/world-map.jpg', caption: 'Full World Map' },
      { category: 'pages', src: 'assets/gallery/page-03.jpg', caption: 'Chapter 2 — Page 2' }
    ],
    news: [
      { tag: 'Chapter Release', date: 'Aug 20, 2026', title: 'Chapter 2 — The Silver Kingdom is live', desc: 'Felix and Richard cross into the Silver Kingdom, and nothing about it is what the old stories promised.' },
      { tag: 'Character Reveal', date: 'Aug 12, 2026', title: 'Meet Ivo, the wanderer with no past', desc: 'Our fifth character profile is up — an elder whose knowledge of the crystals runs deeper than anyone expects.' },
      { tag: 'Artwork', date: 'Aug 3, 2026', title: 'New concept art: the Crystal Spire', desc: 'Early environment concept work for the tower at the center of it all, now in the Gallery.' },
      { tag: 'Development', date: 'Jul 22, 2026', title: 'Journey Begin platform enters open beta', desc: 'Search, bookmarks and the vertical reader are live across desktop and mobile.' }
    ]
  };

  let currentSection = 'manga';
  let editingId = null; // null = creating new doc
  let pendingNewId = null; // pre-generated doc id for new auto-id docs that need a subcollection before saving
  const imageListState = {}; // { fieldKey: [dataUrl, dataUrl, ...] } — live state for image-list fields in the open form

  /* =====================================================================
     AUTH
  ===================================================================== */
  const loginWrap = $('#loginWrap');
  const dashWrap = $('#dashWrap');
  const loginForm = $('#loginForm');
  const loginError = $('#loginError');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');
    const email = $('#loginEmail').value.trim();
    const password = $('#loginPassword').value;
    const btn = $('#loginSubmit');
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // onAuthStateChanged below takes it from here
    } catch (err) {
      loginError.textContent = friendlyAuthError(err);
      loginError.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  });

  $('#logoutBtn').addEventListener('click', () => auth.signOut());

  function friendlyAuthError(err) {
    const code = err && err.code || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      return 'Incorrect email or password.';
    }
    if (code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.';
    if (code.includes('invalid-email')) return 'That email address looks invalid.';
    return 'Sign-in failed. Please try again.';
  }

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      dashWrap.classList.add('hidden');
      loginWrap.classList.remove('hidden');
      return;
    }
    // Check this user is an authorized admin (doc must exist at admins/{uid})
    try {
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists) {
        loginError.textContent = 'This account is not authorized for admin access.';
        loginError.classList.remove('hidden');
        await auth.signOut();
        return;
      }
    } catch (err) {
      loginError.textContent = 'Could not verify admin access. Check Firestore rules / connection.';
      loginError.classList.remove('hidden');
      await auth.signOut();
      return;
    }

    loginWrap.classList.add('hidden');
    dashWrap.classList.remove('hidden');
    $('#sideUserEmail').textContent = user.email;
    renderSection(currentSection);
  });

  /* =====================================================================
     NAV
  ===================================================================== */
  $$('.side-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.side-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentSection = link.dataset.section;
      editingId = null;
      renderSection(currentSection);
    });
  });

  /* =====================================================================
     SECTION RENDER (list + form)
  ===================================================================== */
  let worldMapImageUrl = null; // cached once fetched from settings/worldMap

  async function fetchWorldMapImage() {
    if (worldMapImageUrl !== null) return worldMapImageUrl;
    try {
      const doc = await db.collection('settings').doc('worldMap').get();
      worldMapImageUrl = (doc.exists && doc.data().image) || '';
    } catch (e) {
      worldMapImageUrl = '';
    }
    return worldMapImageUrl;
  }

  async function renderSection(name) {
    const cfg = COLLECTIONS[name];
    const main = $('#mainPanel');
    main.innerHTML = `
      <div class="panel-head">
        <div>
          <h2>${cfg.label}</h2>
          <div class="sub">Changes here update the live site the next time it loads.</div>
        </div>
        ${cfg.noEntries ? '' : `
        <div class="panel-actions">
          <button class="btn btn-sm" id="seedBtn">Import starter content</button>
          <button class="btn btn-primary btn-sm" id="newBtn">+ Add New</button>
        </div>
        `}
      </div>
      ${cfg.mapPicker ? `
        <div class="card" id="worldMapCard">
          <h3>World Map Background</h3>
          <p class="sub" style="margin-bottom:0.8rem;">Upload the map image here — it's the only thing shown in "Explore the World" on the main site, and clicking it there opens the full image.</p>
          <div class="image-upload-row">
            <div class="image-preview" id="worldMapPreview" style="width:160px; height:100px;">Loading…</div>
            <div style="flex:1;">
              <input type="text" id="worldMapUrl" placeholder="Image URL, or upload a file below" style="margin-bottom:0.5rem;">
              <button type="button" class="btn btn-sm" id="worldMapUrlSave" style="margin-bottom:0.5rem;">Use URL</button>
              <input type="file" id="worldMapFile" accept="image/*">
              <div class="upload-progress" id="worldMapProgress"></div>
            </div>
          </div>
        </div>
      ` : ''}
      ${cfg.socialPicker ? `
        <div class="card" id="socialCard">
          <h3>Social Media Links</h3>
          <p class="sub" style="margin-bottom:0.8rem;">Paste your channel/profile links below. Any platform you fill in appears as a glowing icon button on the main site (in the header, hero and footer); leave a field blank to hide that icon.</p>
          <div class="form-grid">
            ${SOCIAL_PLATFORMS.map(p => `
              <div class="field">
                <label for="social-${p.key}">${p.label}</label>
                <input type="url" id="social-${p.key}" data-social-key="${p.key}" placeholder="${p.placeholder}">
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="socialSaveBtn" style="margin-top:0.4rem; width:auto; padding-left:1.6rem; padding-right:1.6rem;">Save Social Links</button>
          <div class="upload-progress" id="socialProgress"></div>
        </div>
      ` : ''}
      ${cfg.noEntries ? '' : `
      <div class="card hidden" id="formCard"></div>
      <div class="card">
        <h3>Existing entries</h3>
        <div id="listWrap"><div class="loading-line">Loading…</div></div>
      </div>
      `}
    `;

    if (cfg.noEntries) {
      if (cfg.mapPicker) wireWorldMapCard();
      if (cfg.socialPicker) wireSocialCard();
      return;
    }

    $('#newBtn').addEventListener('click', () => openForm(name, null));
    $('#seedBtn').addEventListener('click', () => seedDefaults(name));

    if (cfg.mapPicker) wireWorldMapCard();
    if (cfg.socialPicker) wireSocialCard();

    await refreshList(name);
  }

  /* =====================================================================
     SOCIAL MEDIA LINKS CARD — settings/social doc, one field per platform
  ===================================================================== */
  async function wireSocialCard() {
    const progress = $('#socialProgress');
    let existing = {};
    try {
      const doc = await db.collection('settings').doc('social').get();
      existing = (doc.exists && doc.data()) || {};
    } catch (e) { /* no doc yet — leave fields blank */ }

    SOCIAL_PLATFORMS.forEach(p => {
      const input = $(`#social-${p.key}`);
      if (input && existing[p.key]) input.value = existing[p.key];
    });

    $('#socialSaveBtn').addEventListener('click', async () => {
      const data = {};
      SOCIAL_PLATFORMS.forEach(p => {
        const input = $(`#social-${p.key}`);
        const value = input ? input.value.trim() : '';
        data[p.key] = value; // saved even when blank, so clearing a field hides that icon
      });
      progress.textContent = 'Saving…';
      try {
        await db.collection('settings').doc('social').set(data, { merge: true });
        progress.textContent = 'Saved ✓';
        toast('Social media links updated.');
      } catch (err) {
        progress.textContent = 'Failed: ' + (err.message || err);
        toast('Could not save social links.', true);
      }
    });
  }

  async function wireWorldMapCard() {
    const preview = $('#worldMapPreview');
    const fileInput = $('#worldMapFile');
    const urlInput = $('#worldMapUrl');
    const urlSaveBtn = $('#worldMapUrlSave');
    const progress = $('#worldMapProgress');

    const url = await fetchWorldMapImage();
    if (url) {
      preview.style.backgroundImage = `url('${url}')`;
      preview.textContent = '';
      urlInput.value = url;
    } else {
      preview.textContent = 'No map yet';
    }

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      progress.textContent = 'Processing…';
      try {
        const dataUrl = await fileToSafeDataURL(file, 900000);
        await db.collection('settings').doc('worldMap').set({ image: dataUrl }, { merge: true });
        worldMapImageUrl = dataUrl;
        urlInput.value = dataUrl;
        preview.style.backgroundImage = `url('${dataUrl}')`;
        preview.textContent = '';
        progress.textContent = 'Saved ✓';
        toast('World map image updated.');
      } catch (err) {
        progress.textContent = 'Failed: ' + (err.message || err);
      }
    });

    urlSaveBtn.addEventListener('click', async () => {
      const value = urlInput.value.trim();
      if (!value) { progress.textContent = 'Enter an image URL first.'; return; }
      progress.textContent = 'Saving…';
      try {
        await db.collection('settings').doc('worldMap').set({ image: value }, { merge: true });
        worldMapImageUrl = value;
        preview.style.backgroundImage = `url('${value}')`;
        preview.textContent = '';
        progress.textContent = 'Saved ✓';
        toast('World map image updated.');
      } catch (err) {
        progress.textContent = 'Failed: ' + (err.message || err);
      }
    });
  }

  async function refreshList(name) {
    const cfg = COLLECTIONS[name];
    const listWrap = $('#listWrap');
    try {
      const snap = await db.collection(name).get();
      if (snap.empty) {
        listWrap.innerHTML = `<p class="loading-line">No entries yet. Use “Add New” or “Import starter content” to get started.</p>`;
        return;
      }
      const docs = snap.docs.map(d => ({ _id: d.id, ...d.data() }));

      // Sort chapters/news in a sensible order for editing.
      if (name === 'chapters') docs.sort((a, b) => (a.manga || '').localeCompare(b.manga || '') || (a.number || 0) - (b.number || 0));
      if (name === 'news') docs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

      const thumbCol = cfg.fields.some(f => f.type === 'image');

      listWrap.innerHTML = `
        <table>
          <thead>
            <tr>
              ${thumbCol ? '<th></th>' : ''}
              ${cfg.columns.map(c => `<th>${labelFor(cfg, c)}</th>`).join('')}
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${docs.map(doc => rowHTML(cfg, doc, thumbCol, name)).join('')}
          </tbody>
        </table>
      `;

      $$('[data-edit]', listWrap).forEach(btn => {
        btn.addEventListener('click', () => {
          const doc = docs.find(d => d._id === btn.dataset.edit);
          openForm(name, doc);
        });
      });
      $$('[data-del]', listWrap).forEach(btn => {
        btn.addEventListener('click', () => {
          btn.disabled = true;
          deleteDoc(name, btn.dataset.del).finally(() => { btn.disabled = false; });
        });
      });
      $$('[data-pdf]', listWrap).forEach(btn => {
        btn.addEventListener('click', () => {
          const doc = docs.find(d => d._id === btn.dataset.pdf);
          downloadChapterPDF(name, doc, btn);
        });
      });
    } catch (err) {
      listWrap.innerHTML = `<p class="loading-line">Could not load entries: ${escapeHTML(err.message || String(err))}</p>`;
    }
  }

  function labelFor(cfg, key) {
    const f = cfg.fields.find(f => f.key === key);
    return f ? f.label.replace(/\s*\(.+\)$/, '') : key;
  }

  function rowHTML(cfg, doc, thumbCol, collectionName) {
    const imageField = cfg.fields.find(f => f.type === 'image');
    const hasImageList = cfg.fields.some(f => f.type === 'image-list');
    return `
      <tr>
        ${thumbCol ? `<td>${imageField && doc[imageField.key] ? `<img class="cell-thumb" src="${escapeHTML(doc[imageField.key])}" onerror="this.style.visibility='hidden'">` : ''}</td>` : ''}
        ${cfg.columns.map(c => `<td>${formatCell(doc[c])}</td>`).join('')}
        <td class="row-actions">
          <button class="btn btn-sm" data-edit="${escapeAttr(doc._id)}">Edit</button>
          ${hasImageList ? `<button class="btn btn-sm btn-accent" data-pdf="${escapeAttr(doc._id)}">Download PDF</button>` : ''}
          <button class="btn btn-sm btn-danger" data-del="${escapeAttr(doc._id)}">Delete</button>
        </td>
      </tr>
    `;
  }

  /* =====================================================================
     CHAPTER PDF DOWNLOAD
     Pulls a chapter's page images back out of its pageImages subcollection
     (in saved page order) and bundles them into a single PDF, one page
     image per PDF page, sized to match each image's own aspect ratio.
  ===================================================================== */
  async function downloadChapterPDF(collectionName, doc, btn) {
    if (!doc) return;
    if (typeof window.jspdf === 'undefined') {
      toast('PDF library failed to load. Check your internet connection.', true);
      return;
    }
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Loading pages…';

    try {
      const cfg = COLLECTIONS[collectionName];
      const listField = cfg.fields.find(f => f.type === 'image-list');
      const snap = await db.collection(collectionName).doc(doc._id)
        .collection(listField.key).orderBy('order').get();

      if (snap.empty) {
        toast('This chapter has no uploaded pages to download.', true);
        return;
      }

      const urls = snap.docs.map(d => d.data().data);
      const { jsPDF } = window.jspdf;
      let pdf = null;

      for (let i = 0; i < urls.length; i++) {
        btn.textContent = `Building PDF ${i + 1}/${urls.length}…`;
        const img = await loadImage(urls[i]);
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const orientation = w > h ? 'landscape' : 'portrait';
        const mime = urls[i].startsWith('data:image/png') ? 'PNG' : 'JPEG';

        if (!pdf) {
          pdf = new jsPDF({ orientation, unit: 'px', format: [w, h], compress: true });
        } else {
          pdf.addPage([w, h], orientation);
        }
        pdf.addImage(urls[i], mime, 0, 0, w, h, undefined, 'FAST');
      }

      const mangaSlug = (doc.manga || 'chapter').toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const chNum = doc.number !== undefined && doc.number !== null && doc.number !== '' ? doc.number : '';
      const filename = `${mangaSlug || 'chapter'}-chapter-${chNum || snap.size}.pdf`;

      pdf.save(filename);
      toast('Chapter PDF downloaded.');
    } catch (err) {
      toast('PDF download failed: ' + (err.message || err), true);
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }

  function formatCell(v) {
    if (v === undefined || v === null) return '';
    if (Array.isArray(v)) return escapeHTML(v.join(', '));
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return escapeHTML(String(v));
  }

  function escapeHTML(s = '') {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* =====================================================================
     FORM (create / edit)
  ===================================================================== */
  function openForm(name, doc) {
    const cfg = COLLECTIONS[name];
    editingId = doc ? doc._id : null;
    pendingNewId = null;
    const formCard = $('#formCard');
    formCard.classList.remove('hidden');

    const hasImageList = cfg.fields.some(f => f.type === 'image-list');
    // Auto-id collections (chapters, gallery, news) that use image-list fields
    // need a doc id up front so page-subcollection writes have somewhere to
    // go, even before the parent document itself is saved.
    if (!doc && !cfg.idField && hasImageList) {
      pendingNewId = db.collection(name).doc().id;
    }

    const idFieldHTML = cfg.idField ? `
      <div class="field full">
        <label for="f_docid">Document ID ${doc ? '(cannot be changed)' : ''}</label>
        <input type="text" id="f_docid" value="${doc ? escapeAttr(doc._id) : ''}" ${doc ? 'disabled' : ''} placeholder="e.g. eternity-of-crystal">
        ${cfg.idHint ? `<div class="sub" style="margin-top:0.3rem; font-size:0.78rem;">${cfg.idHint}</div>` : ''}
      </div>` : '';

    formCard.innerHTML = `
      <h3>${doc ? 'Edit entry' : 'Add new entry'}</h3>
      <div class="form-error hidden" id="formError"></div>
      <form id="entryForm">
        <div class="form-grid">
          ${idFieldHTML}
          ${cfg.fields.map(f => fieldHTML(f, doc)).join('')}
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="saveBtn">${doc ? 'Save Changes' : 'Create'}</button>
            <button type="button" class="btn" id="cancelBtn">Cancel</button>
          </div>
        </div>
      </form>
    `;

    // Wire image upload previews/pickers
    cfg.fields.filter(f => f.type === 'image').forEach(f => wireImageField(f, name, doc));
    cfg.fields.filter(f => f.type === 'image-list').forEach(f => {
      imageListState[f.key] = [];
      wireImageListField(f, name, doc);
      if (doc) loadImageListFromSubcollection(name, doc._id, f);
    });
    wireConditionalFields(cfg);
    $('#cancelBtn').addEventListener('click', () => {
      formCard.classList.add('hidden');
      formCard.innerHTML = '';
      editingId = null;
      pendingNewId = null;
    });

    $('#entryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      saveEntry(name, cfg, doc);
    });

    formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function escapeAttr(s = '') { return String(s).replace(/"/g, '&quot;'); }

  function fieldHTML(f, doc) {
    const val = doc ? doc[f.key] : undefined;
    const full = f.full ? 'full' : '';
    const id = 'f_' + f.key;

    if (f.type === 'textarea') {
      return `<div class="field ${full}"><label for="${id}">${f.label}</label><textarea id="${id}" data-key="${f.key}">${val !== undefined ? escapeHTML(val) : ''}</textarea></div>`;
    }
    if (f.type === 'select') {
      return `<div class="field ${full}"><label for="${id}">${f.label}</label>
        <select id="${id}" data-key="${f.key}">
          ${f.options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select></div>`;
    }
    if (f.type === 'checkbox') {
      return `<div class="field ${full}"><label>${f.label}</label>
        <div class="checkbox-row"><input type="checkbox" id="${id}" data-key="${f.key}" ${val ? 'checked' : ''}> <span class="sub">Enabled</span></div></div>`;
    }
    if (f.type === 'list') {
      const joined = Array.isArray(val) ? val.join(', ') : (val || '');
      return `<div class="field ${full}"><label for="${id}">${f.label}</label><input type="text" id="${id}" data-key="${f.key}" data-list="true" value="${escapeAttr(joined)}"></div>`;
    }
    if (f.type === 'image') {
      const current = val || '';
      return `<div class="field ${full}">
        <label for="${id}">${f.label}</label>
        <div class="image-field">
          <div class="image-upload-row">
            <div class="image-preview" id="${id}_preview" style="${current ? `background-image:url('${escapeAttr(current)}')` : ''}">${current ? '' : 'No image'}</div>
            <div style="flex:1;">
              <input type="text" id="${id}" data-key="${f.key}" value="${escapeAttr(current)}" placeholder="Image URL, or upload a file below">
              <input type="file" id="${id}_file" accept="image/*" style="margin-top:0.5rem;">
              <div class="upload-progress" id="${id}_progress"></div>
            </div>
          </div>
        </div>
      </div>`;
    }
    if (f.type === 'image-list') {
      return `<div class="field ${full}">
        <label for="${id}_files">${f.label}</label>
        <div class="sub" style="font-size:0.78rem; margin-bottom:0.5rem;">Select multiple files at once, in the order they should appear (page 1 first) — they're compressed in your browser and stored directly in Firestore, no billing needed. Drag a page thumbnail to reorder it, or use ↑ / ↓. Or paste image URLs below instead, one per line, in reading order.</div>
        <input type="file" id="${id}_files" accept="image/*" multiple>
        <div class="upload-progress" id="${id}_progress"></div>

        <div style="margin-top:0.8rem;">
          <textarea id="${id}_urltext" placeholder="https://example.com/page-01.jpg&#10;https://example.com/page-02.jpg&#10;..."></textarea>
          <button type="button" class="btn btn-sm" id="${id}_addurls" style="margin-top:0.5rem;">Add URLs to pages</button>
        </div>

        <div id="${id}_list" class="image-list-grid" style="margin-top:0.8rem;"></div>
      </div>`;
    }
    if (f.type === 'datetime') {
      // Stored as an ISO string (UTC); the input itself works in the
      // admin's local time, converted on the way in/out (see
      // collectFormData). Empty/invalid values just render blank.
      const local = val ? isoToLocalInputValue(val) : '';
      return `<div class="field ${full}" data-field="${f.key}">
        <label for="${id}">${f.label}</label>
        <input type="datetime-local" id="${id}" data-key="${f.key}" data-type="datetime" value="${local}">
        <div class="sub" style="margin-top:0.3rem; font-size:0.78rem;">Shown in your local time. The site counts down to this exact moment for every visitor, in their own timezone.</div>
      </div>`;
    }
    const inputType = f.type === 'number' ? 'number' : 'text';
    return `<div class="field ${full}" data-field="${f.key}"><label for="${id}">${f.label}</label><input type="${inputType}" id="${id}" data-key="${f.key}" value="${val !== undefined ? escapeAttr(val) : ''}" ${f.required ? 'required' : ''}></div>`;
  }

  // datetime-local inputs need "YYYY-MM-DDTHH:mm" in *local* time — convert
  // a stored ISO (UTC) string to that shape for display in the form.
  function isoToLocalInputValue(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // Hide/show fields whose visibility depends on another field's value
  // (e.g. "Unlocks At" only matters when Status = Upcoming). Re-checked
  // whenever the controlling field changes.
  function wireConditionalFields(cfg) {
    const conditional = cfg.fields.filter(f => f.showIf);
    if (!conditional.length) return;
    const applyAll = () => conditional.forEach(f => {
      const controller = $('#f_' + f.showIf.key);
      const wrap = $(`[data-field="${f.key}"]`);
      if (!controller || !wrap) return;
      wrap.classList.toggle('hidden', controller.value !== f.showIf.equals);
    });
    conditional.forEach(f => {
      const controller = $('#f_' + f.showIf.key);
      if (controller && !controller.dataset.condWired) {
        controller.dataset.condWired = '1';
        controller.addEventListener('change', applyAll);
      }
    });
    applyAll();
  }

  function wireImageField(f, collectionName, doc) {
    const id = 'f_' + f.key;
    const urlInput = $('#' + id);
    const fileInput = $('#' + id + '_file');
    const preview = $('#' + id + '_preview');
    const progress = $('#' + id + '_progress');

    urlInput.addEventListener('input', () => {
      if (urlInput.value) {
        preview.style.backgroundImage = `url('${urlInput.value}')`;
        preview.textContent = '';
      }
    });

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      progress.textContent = 'Processing image…';
      try {
        const dataUrl = await fileToSafeDataURL(file);
        urlInput.value = dataUrl;
        preview.style.backgroundImage = `url('${dataUrl}')`;
        preview.textContent = '';
        progress.textContent = `Ready ✓ (~${Math.round(dataUrl.length / 1024)} KB)`;
      } catch (err) {
        progress.textContent = 'Could not process image: ' + (err.message || err);
      }
    });
  }

  async function loadImageListFromSubcollection(name, docId, f) {
    const progress = $('#f_' + f.key + '_progress');
    try {
      const snap = await db.collection(name).doc(docId).collection(f.key).orderBy('order').get();
      imageListState[f.key] = snap.docs.map(d => d.data().data);
    } catch (err) {
      if (progress) progress.textContent = 'Could not load existing pages: ' + (err.message || err);
    }
    if (imageListRenderers[f.key]) imageListRenderers[f.key]();
  }

  const imageListRenderers = {}; // { fieldKey: renderList() } — set by wireImageListField, called after async loads

  function wireImageListField(f, collectionName, doc) {
    const filesInput = $('#f_' + f.key + '_files');
    const progress = $('#f_' + f.key + '_progress');
    const listEl = $('#f_' + f.key + '_list');
    const urlText = $('#f_' + f.key + '_urltext');
    const addUrlsBtn = $('#f_' + f.key + '_addurls');

    function renderList() {
      const urls = imageListState[f.key];
      if (!urls.length) {
        listEl.innerHTML = `<p class="sub" style="font-size:0.8rem;">No pages yet.</p>`;
        return;
      }
      listEl.innerHTML = urls.map((url, i) => `
        <div class="image-list-item" draggable="true" data-idx="${i}">
          <div class="image-list-thumb" style="background-image:url('${escapeAttr(url)}')"></div>
          <div class="image-list-num">Page ${i + 1}</div>
          <div class="image-list-actions">
            <button type="button" class="btn btn-sm" data-move="up" data-idx="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="btn btn-sm" data-move="down" data-idx="${i}" ${i === urls.length - 1 ? 'disabled' : ''}>↓</button>
            <button type="button" class="btn btn-sm btn-danger" data-remove-page="${i}">✕</button>
          </div>
        </div>
      `).join('');

      $$('[data-move]', listEl).forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.idx, 10);
          const dir = btn.dataset.move === 'up' ? -1 : 1;
          const arr = imageListState[f.key];
          const j = i + dir;
          if (j < 0 || j >= arr.length) return;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          renderList();
        });
      });
      $$('[data-remove-page]', listEl).forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.removePage, 10);
          imageListState[f.key].splice(i, 1);
          renderList();
        });
      });

      // Drag-and-drop reordering — drag a page thumbnail onto another to
      // move it there. Falls back to the ↑ / ↓ buttons on touch devices
      // where drag-and-drop between elements isn't well supported.
      let dragFrom = null;
      $$('.image-list-item', listEl).forEach(item => {
        item.addEventListener('dragstart', () => {
          dragFrom = parseInt(item.dataset.idx, 10);
          item.classList.add('dragging');
        });
        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
        });
        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          item.classList.add('drag-over');
        });
        item.addEventListener('dragleave', () => {
          item.classList.remove('drag-over');
        });
        item.addEventListener('drop', (e) => {
          e.preventDefault();
          item.classList.remove('drag-over');
          const dragTo = parseInt(item.dataset.idx, 10);
          if (dragFrom === null || dragFrom === dragTo) return;
          const arr = imageListState[f.key];
          const [moved] = arr.splice(dragFrom, 1);
          arr.splice(dragTo, 0, moved);
          dragFrom = null;
          renderList();
        });
      });
    }

    filesInput.addEventListener('change', async () => {
      const files = Array.from(filesInput.files || []);
      if (!files.length) return;
      let done = 0;
      progress.textContent = `Processing 0/${files.length}…`;
      for (const file of files) {
        try {
          const dataUrl = await fileToSafeDataURL(file);
          imageListState[f.key].push(dataUrl);
          done++;
          progress.textContent = `Processing ${done}/${files.length}…`;
          renderList();
        } catch (err) {
          progress.textContent = `Could not process "${file.name}": ${err.message || err}`;
          return;
        }
      }
      progress.textContent = `Ready ✓ (${done}/${files.length} pages)`;
      filesInput.value = '';
    });

    addUrlsBtn.addEventListener('click', () => {
      const urls = urlText.value
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
      if (!urls.length) return;
      imageListState[f.key].push(...urls);
      urlText.value = '';
      renderList();
      toast(`Added ${urls.length} page${urls.length > 1 ? 's' : ''}.`);
    });

    imageListRenderers[f.key] = renderList;

    if (doc) {
      listEl.innerHTML = `<p class="sub" style="font-size:0.8rem;">Loading pages…</p>`;
    } else {
      renderList();
    }
  }


  function collectFormData(cfg) {
    const data = {};
    let imageListCount = 0;
    cfg.fields.forEach(f => {
      if (f.type === 'image-list') {
        // Not stored on the parent doc — synced to a subcollection instead
        // (see syncImageListSubcollection) so a chapter with many/large
        // pages can never exceed Firestore's 1MB-per-document limit.
        imageListCount = imageListState[f.key].length;
        return;
      }
      const el = $('#f_' + f.key);
      if (!el) return;
      if (f.type === 'checkbox') {
        data[f.key] = el.checked;
      } else if (f.type === 'number') {
        data[f.key] = el.value === '' ? 0 : Number(el.value);
      } else if (f.type === 'list') {
        data[f.key] = el.value.split(',').map(s => s.trim()).filter(Boolean);
      } else if (f.type === 'datetime') {
        // datetime-local gives local time with no offset — convert to a
        // real ISO/UTC instant so it means the same moment for every
        // visitor regardless of their timezone.
        data[f.key] = el.value ? new Date(el.value).toISOString() : '';
      } else {
        data[f.key] = el.value;
      }
    });
    // Keep the legacy "pages" count field in sync automatically when pages
    // have been added, so the reader always shows the right number.
    if (imageListCount) data.pages = imageListCount;
    return data;
  }

  async function syncImageListSubcollection(name, docId, f, onProgress) {
    const subRef = db.collection(name).doc(docId).collection(f.key);
    const existing = await subRef.get();

    // Firestore write requests have a payload size cap (a few MB), and a
    // chapter's worth of compressed page images can easily exceed it if
    // sent as one batch — so writes are chunked into small groups instead.
    const CHUNK_SIZE = 6;

    const deleteRefs = existing.docs.map(d => d.ref);
    for (let i = 0; i < deleteRefs.length; i += CHUNK_SIZE) {
      const batch = db.batch();
      deleteRefs.slice(i, i + CHUNK_SIZE).forEach(ref => batch.delete(ref));
      await batch.commit();
    }

    const urls = imageListState[f.key];
    for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
      const batch = db.batch();
      urls.slice(i, i + CHUNK_SIZE).forEach((url, j) => {
        const idx = i + j;
        batch.set(subRef.doc(String(idx).padStart(4, '0')), { order: idx, data: url });
      });
      await batch.commit();
      if (onProgress) onProgress(Math.min(i + CHUNK_SIZE, urls.length), urls.length);
    }
  }

  async function saveEntry(name, cfg, doc) {
    const formError = $('#formError');
    formError.classList.add('hidden');
    const saveBtn = $('#saveBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';

    try {
      const data = collectFormData(cfg);
      const imageListFields = cfg.fields.filter(f => f.type === 'image-list');

      let docId = doc ? doc._id : null;
      if (cfg.idField) {
        const idInput = $('#f_docid');
        if (!doc) {
          docId = idInput.value.trim();
          if (!docId) throw new Error('Document ID is required.');
          if (!/^[a-z0-9-]+$/i.test(docId)) throw new Error('Document ID may only contain letters, numbers and dashes.');
          const existing = await db.collection(name).doc(docId).get();
          if (existing.exists) throw new Error('That ID already exists — choose a different one.');
        }
      } else if (!doc && imageListFields.length) {
        // Auto-id collection with image-list fields: use the id we
        // pre-generated when the form opened, so subcollection writes and
        // the parent doc share the same id.
        docId = pendingNewId;
      }

      if (docId) {
        await db.collection(name).doc(docId).set(data, { merge: true });
      } else {
        const ref = await db.collection(name).add(data);
        docId = ref.id;
      }

      for (const f of imageListFields) {
        saveBtn.textContent = 'Saving pages…';
        await syncImageListSubcollection(name, docId, f, (done, total) => {
          saveBtn.textContent = `Saving pages ${done}/${total}…`;
        });
      }

      toast(doc ? 'Entry updated.' : 'Entry created.');
      $('#formCard').classList.add('hidden');
      $('#formCard').innerHTML = '';
      editingId = null;
      pendingNewId = null;
      await refreshList(name);
    } catch (err) {
      formError.textContent = err.message || String(err);
      formError.classList.remove('hidden');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = doc ? 'Save Changes' : 'Create';
    }
  }

  /* =====================================================================
     CUSTOM CONFIRM (native window.confirm() is silently blocked in some
     sandboxed/embedded preview contexts — it just returns without ever
     showing a dialog, which made Delete look like it "did nothing". This
     in-page modal works everywhere and always resolves explicitly.
  ===================================================================== */
  function customConfirm(message, confirmLabel = 'Confirm') {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-box">
          <p>${escapeHTML(message)}</p>
          <div class="confirm-actions">
            <button type="button" class="btn btn-sm" id="confirmCancelBtn">Cancel</button>
            <button type="button" class="btn btn-sm btn-danger" id="confirmOkBtn">${escapeHTML(confirmLabel)}</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);

      const cleanup = (result) => { overlay.remove(); resolve(result); };
      $('#confirmCancelBtn', overlay).addEventListener('click', () => cleanup(false));
      $('#confirmOkBtn', overlay).addEventListener('click', () => cleanup(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { document.removeEventListener('keydown', esc); cleanup(false); }
      });
    });
  }

  async function deleteDoc(name, id) {
    const ok = await customConfirm('Delete this entry? This cannot be undone.', 'Delete');
    if (!ok) return;
    try {
      const cfg = COLLECTIONS[name];
      const imageListFields = cfg.fields.filter(f => f.type === 'image-list');
      for (const f of imageListFields) {
        const subSnap = await db.collection(name).doc(id).collection(f.key).get();
        if (!subSnap.empty) {
          const batch = db.batch();
          subSnap.docs.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      }
      await db.collection(name).doc(id).delete();
      toast('Entry deleted.');
      await refreshList(name);
    } catch (err) {
      console.error('Journey Begin admin: delete failed for', name, id, err);
      toast('Delete failed: ' + (err.message || err) + ' — open the browser console (F12) for details. This is usually a Firestore permissions issue: make sure your signed-in account has a matching document in the "admins" collection.', true);
    }
  }

  /* =====================================================================
     SEED DEFAULTS (only intended for first-time setup on an empty collection)
  ===================================================================== */
  async function seedDefaults(name) {
    const items = DEFAULTS[name] || [];
    if (!items.length) return toast('No starter content available for this section.', true);

    const snap = await db.collection(name).get();
    if (!snap.empty) {
      const ok = await customConfirm(`"${COLLECTIONS[name].label}" already has entries. Import starter content anyway? This will add duplicates.`, 'Import Anyway');
      if (!ok) return;
    }

    try {
      const batch = db.batch();
      items.forEach(item => {
        const { slug, ...rest } = item;
        const ref = slug ? db.collection(name).doc(slug) : db.collection(name).doc();
        batch.set(ref, rest, { merge: true });
      });
      await batch.commit();
      toast('Starter content imported.');
      await refreshList(name);
    } catch (err) {
      toast('Import failed: ' + (err.message || err), true);
    }
  }

})();
