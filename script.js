/* =====================================================================
   JOURNEY BEGIN — SCRIPT.JS
   All data lives in one place (DATA below) so new manga, chapters,
   characters, lore, gallery items and news can be added later just by
   editing these arrays/objects — no HTML changes required.
   ===================================================================== */

(() => {
  'use strict';

  /* =====================================================================
     0. DATA — add new manga / content here
  ===================================================================== */
  const DATA = {

    manga: [
      {
        id: 'eternity-of-crystal',
        title: 'Eternity of Crystal',
        author: 'Vishva & Mathavan',
        genre: 'Fantasy · Adventure · Mystery',
        status: 'Ongoing',
        chapters: 2,
        featured: true,
        cover: 'assets/manga/eternity-of-crystal/cover.jpg',
        description: 'An extraordinary journey begins in a world of crystals, kingdoms, mysteries and destiny.'
      },
      {
        id: 'ashen-vow',
        title: 'Ashen Vow',
        author: 'Journey Begin Studio',
        genre: 'Dark Fantasy · Drama',
        status: 'Coming Soon',
        chapters: 0,
        featured: false,
        cover: 'assets/manga/ashen-vow/cover.jpg',
        description: 'A fallen knight seeks redemption in a kingdom built on ash and broken oaths.'
      },
      {
        id: 'silver-static',
        title: 'Silver Static',
        author: 'Journey Begin Studio',
        genre: 'Sci-Fi · Mystery',
        status: 'Coming Soon',
        chapters: 0,
        featured: false,
        cover: 'assets/manga/silver-static/cover.jpg',
        description: 'In a city powered by memory, one signal refuses to be erased.'
      }
    ],

    chapters: [
      { manga: 'eternity-of-crystal', arc: 'Arc 1 — Tale of Crystals', number: 1, title: 'Tale of Crystals', status: 'Available', pages: 6 },
      { manga: 'eternity-of-crystal', arc: 'Arc 1 — Tale of Crystals', number: 2, title: 'The Silver Kingdom', status: 'Available', pages: 5 },
      { manga: 'eternity-of-crystal', arc: 'Arc 2 — Echoes of Albia', number: 3, title: 'Echoes of Albia', status: 'Coming Soon', pages: 0 }
    ],

    characters: [
      {
        id: 'felix', name: 'Felix', age: '17',
        image: 'assets/characters/felix.jpg',
        short: 'A determined wanderer bound to the crystal\u2019s first awakening.',
        full: 'Felix carries a fragment of the Eternity Crystal without knowing why he was chosen. Quick-tempered but fiercely loyal, he is the story\u2019s reluctant compass — pulled toward a destiny far larger than the quiet life he once wanted.',
        traits: ['Crystal-bound', 'Impulsive', 'Loyal']
      },
      {
        id: 'richard', name: 'Richard', age: '17',
        image: 'assets/characters/richard.jpg',
        short: 'Felix\u2019s closest ally, sharp-minded and quietly protective.',
        full: 'Richard balances the group with calculation where Felix acts on instinct. Raised among scholars, he reads the world in patterns and prophecy — and is often the first to sense when something ancient has stirred.',
        traits: ['Strategist', 'Guarded', 'Scholar']
      },
      {
        id: 'albia', name: 'Albia', age: '15–16',
        image: 'assets/characters/albia.jpg',
        short: 'A quiet presence with a fractured connection to the old kingdoms.',
        full: 'Albia speaks little, but the crystals seem to answer when she is near. Her past is tangled with the fall of a kingdom no one else remembers, and every chapter peels back another layer of what she was made to carry.',
        traits: ['Mysterious', 'Empathic', 'Kingdom-born']
      },
      {
        id: 'cyrus', name: 'Cyrus', age: '17',
        image: 'assets/characters/cyrus.jpg',
        short: 'Charismatic, restless, and always first into danger.',
        full: 'Cyrus fights first and asks questions later — a habit that has saved the group as often as it\u2019s endangered them. Beneath the bravado is someone still learning what it costs to protect people he loves.',
        traits: ['Reckless', 'Charismatic', 'Protector']
      },
      {
        id: 'ivo', name: 'Ivo', age: '24–27',
        image: 'assets/characters/ivo.jpg',
        short: 'An enigmatic elder who knows more than he admits.',
        full: 'Ivo appears exactly when the group needs guidance — and vanishes just as easily. His knowledge of the crystals runs deeper than any living record should allow, and his motives remain the story\u2019s quietest mystery.',
        traits: ['Enigmatic', 'Elder', 'Untrusted']
      }
    ],

    lore: [
      { id: 'crystals', title: 'Crystals', body: 'The crystals are shards of a single, ancient formation shattered at the dawn of the current age. Each fragment resonates with a different aspect of will, memory, or fate — and each one chooses its bearer, not the other way around.' },
      { id: 'crystal-powers', title: 'Crystal Powers', body: 'No two crystal-bonds manifest the same power twice. Recorded effects range from accelerated instinct and clairvoyant flashes to the ability to fracture solid stone with a touch — but every power exacts a cost proportional to its strength.' },
      { id: 'kingdoms', title: 'Kingdoms', body: 'Three kingdoms once shared an uneasy peace over the crystal fields: the Silver Kingdom, the lost realm beneath Ashfall, and a third whose name has been deliberately erased from every surviving record.' },
      { id: 'weapons', title: 'Weapons', body: 'Crystal-forged weapons are rare and dangerous, drawing power directly from their wielder\u2019s bond. Most were destroyed after the Sundering; the few that remain are hunted by kingdoms and scavengers alike.' },
      { id: 'ancient-history', title: 'Ancient History', body: 'Long before the current kingdoms, a single empire is said to have controlled the whole of the crystal fields. Its fall — the Sundering — scattered both the crystals and the truth of what caused it.' },
      { id: 'mysteries', title: 'Mysteries', body: 'Why crystals choose their bearers, what Ivo truly is, and what waits at the center of the Crystal Spire remain unanswered. Journey Begin will unravel these slowly, one chapter at a time.' }
    ],

    gallery: [
      { id: 'g1', category: 'pages', src: 'assets/gallery/page-01.jpg', caption: 'Chapter 1 — Page 3' },
      { id: 'g2', category: 'pages', src: 'assets/gallery/page-02.jpg', caption: 'Chapter 1 — Page 5' },
      { id: 'g3', category: 'characters', src: 'assets/gallery/felix-art.jpg', caption: 'Felix — Character Art' },
      { id: 'g4', category: 'characters', src: 'assets/gallery/albia-art.jpg', caption: 'Albia — Character Art' },
      { id: 'g5', category: 'concept', src: 'assets/gallery/concept-spire.jpg', caption: 'Concept — The Crystal Spire' },
      { id: 'g6', category: 'concept', src: 'assets/gallery/concept-kingdom.jpg', caption: 'Concept — Silver Kingdom Gate' },
      { id: 'g7', category: 'maps', src: 'assets/gallery/world-map.jpg', caption: 'Full World Map' },
      { id: 'g8', category: 'pages', src: 'assets/gallery/page-03.jpg', caption: 'Chapter 2 — Page 2' }
    ],

    news: [
      { tag: 'Chapter Release', date: 'Aug 20, 2026', title: 'Chapter 2 — The Silver Kingdom is live', desc: 'Felix and Richard cross into the Silver Kingdom, and nothing about it is what the old stories promised.' },
      { tag: 'Character Reveal', date: 'Aug 12, 2026', title: 'Meet Ivo, the wanderer with no past', desc: 'Our fifth character profile is up — an elder whose knowledge of the crystals runs deeper than anyone expects.' },
      { tag: 'Artwork', date: 'Aug 3, 2026', title: 'New concept art: the Crystal Spire', desc: 'Early environment concept work for the tower at the center of it all, now in the Gallery.' },
      { tag: 'Development', date: 'Jul 22, 2026', title: 'Journey Begin platform enters open beta', desc: 'Search, bookmarks and the vertical reader are live across desktop and mobile.' }
    ],

    worldMapImage: null, // set via admin (World Map) — null = use the default generated art

    social: {} // set via admin (Social Media) — { telegram: 'https://...', whatsapp: 'https://...', ... }
  };

  /* =====================================================================
     0a. SOCIAL MEDIA — platform list + icon glyphs for the links set in
     the admin panel's Social Media screen. A platform only renders on the
     site once its URL is filled in there.
  ===================================================================== */
  const SOCIAL_PLATFORMS = [
    { key: 'telegram',  label: 'Telegram' },
    { key: 'whatsapp',  label: 'WhatsApp' },
    { key: 'discord',   label: 'Discord' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'facebook',  label: 'Facebook' },
    { key: 'x',         label: 'X (Twitter)' },
    { key: 'youtube',   label: 'YouTube' },
    { key: 'tiktok',    label: 'TikTok' },
    { key: 'website',   label: 'Website' }
  ];

  const SOCIAL_ICONS = {
    telegram: '<svg viewBox="0 0 24 24"><polygon points="3,12 21,4 15,20 11,13 3,12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="21" y1="4" x2="11" y2="13" stroke="currentColor" stroke-width="1.6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.6 8.6c-.3.6-.5 1.4 0 2.4.7 1.5 2.6 3.4 4.1 4.1 1 .5 1.8.3 2.4 0 .4-.2.9-.8 1-1.2.1-.3 0-.5-.2-.6l-1.6-.9c-.2-.1-.4-.1-.6.1l-.5.6c-.1.1-.3.2-.5.1-.6-.3-1.5-1-2.1-2.1-.1-.2-.1-.4.1-.5l.6-.5c.2-.2.2-.4.1-.6L10.4 7.7c-.1-.2-.3-.3-.5-.2-.5.2-1 .5-1.3 1Z" fill="currentColor"/></svg>',
    discord: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="11" rx="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="11.5" r="1.4" fill="currentColor"/><circle cx="15" cy="11.5" r="1.4" fill="currentColor"/><path d="M8 17l-1.5 3M16 17l1.5 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="12" y="16.8" font-size="12" font-family="Georgia, serif" text-anchor="middle" fill="currentColor">f</text></svg>',
    x: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><rect x="2.5" y="6" width="19" height="12" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><circle cx="9.5" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12.5 16V4.5c0 2.3 1.9 4.2 4.3 4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    website: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="2.8" y1="12" x2="21.2" y2="12" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="4" ry="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
  };

  /* =====================================================================
     0b. LIVE DATA — pulls content from Firestore (fed by the /admin panel)
     Falls back silently to the hard-coded DATA above if Firebase isn't
     configured, the collections are still empty, or the network request
     fails for any reason — so the site always renders something.
  ===================================================================== */
  const DATA_CACHE_KEY = 'journeybegin_data_cache_v1';
  const DATA_CACHE_KEYS = ['manga', 'chapters', 'characters', 'lore', 'gallery', 'news'];
  const DATA_CACHE_SCALAR_KEYS = ['worldMapImage', 'social'];

  // Loads the last successfully-fetched live content (saved to this browser's
  // session storage) so a page reload shows real content immediately instead
  // of flashing the built-in placeholder content first, while the network
  // fetch runs quietly in the background to catch anything that changed.
  function loadCachedData() {
    try {
      const raw = sessionStorage.getItem(DATA_CACHE_KEY);
      if (!raw) return;
      const cached = JSON.parse(raw);
      DATA_CACHE_KEYS.forEach(k => {
        if (Array.isArray(cached[k]) && cached[k].length) DATA[k] = cached[k];
      });
      DATA_CACHE_SCALAR_KEYS.forEach(k => {
        if (cached[k]) DATA[k] = cached[k];
      });
    } catch (e) { /* corrupt/unavailable cache — ignore, fallback DATA is used */ }
  }

  function saveCachedData() {
    try {
      const snapshot = {};
      DATA_CACHE_KEYS.forEach(k => { snapshot[k] = DATA[k]; });
      DATA_CACHE_SCALAR_KEYS.forEach(k => { snapshot[k] = DATA[k]; });
      sessionStorage.setItem(DATA_CACHE_KEY, JSON.stringify(snapshot));
    } catch (e) { /* storage full/unavailable — not critical, just skip caching */ }
  }

  // Fast path — text-only or already-lazy collections, fetched immediately
  // so the top of the page (manga grid) is live as fast as possible.
  async function loadRemoteData() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;

    try {
      const db = fb.db;
      const [mangaSnap, chaptersSnap, loreSnap, newsSnap, socialSnap] = await Promise.all([
        db.collection('manga').get(),
        db.collection('chapters').get(),
        db.collection('lore').get(),
        db.collection('news').get(),
        db.collection('settings').doc('social').get()
      ]);

      if (!mangaSnap.empty) {
        DATA.manga = mangaSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      if (!chaptersSnap.empty) {
        // Only lightweight chapter metadata is fetched here — the actual
        // page images are fetched on demand when a reader opens a chapter
        // (see openReader), so page load isn't slowed down by downloading
        // every chapter's pages up front.
        DATA.chapters = chaptersSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.manga || '').localeCompare(b.manga || '') || (a.number || 0) - (b.number || 0));
      }
      if (!loreSnap.empty) {
        DATA.lore = loreSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      if (!newsSnap.empty) {
        DATA.news = newsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      if (socialSnap.exists) {
        DATA.social = socialSnap.data() || {};
      }

      saveCachedData();
    } catch (err) {
      console.warn('Journey Begin: could not load live content from Firebase, showing built-in defaults.', err);
    }
  }

  // Slow path — collections that carry compressed images (portraits, gallery
  // photos, the world map background). These are only fetched once their
  // section actually scrolls near the viewport (see initLazySections), so a
  // visit that never scrolls to Characters/World/Gallery never downloads
  // their images at all, and the manga grid up top is never held up by them.
  async function loadCharactersSection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const snap = await fb.db.collection('characters').get();
      if (!snap.empty) {
        DATA.characters = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderCharacters();
        saveCachedData();
        SEARCH_INDEX = buildSearchIndex();
      }
    } catch (err) {
      console.warn('Journey Begin: could not load characters.', err);
    }
  }

  async function loadWorldSection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const worldMapSnap = await fb.db.collection('settings').doc('worldMap').get();
      if (worldMapSnap.exists && worldMapSnap.data().image) {
        DATA.worldMapImage = worldMapSnap.data().image;
      }
      renderWorldMap();
      saveCachedData();
      SEARCH_INDEX = buildSearchIndex();
    } catch (err) {
      console.warn('Journey Begin: could not load world map.', err);
    }
  }

  async function loadGallerySection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const snap = await fb.db.collection('gallery').get();
      if (!snap.empty) {
        DATA.gallery = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderGallery();
        saveCachedData();
        SEARCH_INDEX = buildSearchIndex();
      }
    } catch (err) {
      console.warn('Journey Begin: could not load gallery.', err);
    }
  }

  // Kicks off each lazy section's fetch the moment it scrolls near the
  // viewport (600px early, so it's ready by the time it's actually visible)
  // rather than on first paint — this is what keeps the initial page load
  // light regardless of how many character portraits/gallery images exist.
  function initLazySections() {
    const targets = [
      { id: 'characters', loader: loadCharactersSection },
      { id: 'world', loader: loadWorldSection },
      { id: 'gallery', loader: loadGallerySection },
      { id: 'reviews', loader: loadReviewsSection }
    ];
    targets.forEach(({ id, loader }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!('IntersectionObserver' in window)) { loader(); return; }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(el);
            loader();
          }
        });
      }, { rootMargin: '600px 0px' });
      observer.observe(el);
    });
  }

  /* =====================================================================
     1. PLACEHOLDER ART GENERATOR
     Generates a tasteful faceted-gradient placeholder as a data URI so the
     site looks complete before real art files are dropped into /assets.
     Any <img data-fallback-title="..."> will use this automatically.
  ===================================================================== */
  function placeholderSVG(title = '', subtitle = '', w = 600, h = 800) {
    const palettes = [
      ['#1b1b24', '#2a2438'], ['#151b22', '#233846'], ['#1a1622', '#33284a']
    ];
    const p = palettes[Math.abs(hashCode(title)) % palettes.length];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${p[0]}"/>
            <stop offset="100%" stop-color="${p[1]}"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="${p[0]}"/>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <polygon points="${w*0.1},${h*0.15} ${w*0.5},${h*0.02} ${w*0.9},${h*0.2} ${w*0.75},${h*0.55} ${w*0.3},${h*0.6}"
          fill="none" stroke="rgba(143,211,236,0.18)" stroke-width="1.5"/>
        <polygon points="${w*0.15},${h*0.55} ${w*0.55},${h*0.5} ${w*0.85},${h*0.85} ${w*0.4},${h*0.95} ${w*0.05},${h*0.8}"
          fill="none" stroke="rgba(138,120,201,0.16)" stroke-width="1.5"/>
        <text x="50%" y="${h*0.92}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(14, w*0.045)}"
          fill="rgba(238,241,246,0.55)" letter-spacing="1">${escapeXML(title)}</text>
        <text x="50%" y="${h*0.96}" text-anchor="middle" font-family="monospace" font-size="${Math.max(9, w*0.026)}"
          fill="rgba(143,211,236,0.5)" letter-spacing="2">${escapeXML(subtitle.toUpperCase())}</text>
      </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h = (h<<5)-h+str.charCodeAt(i); h|=0; } return h; }
  function escapeXML(s=''){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /** Attach an onerror fallback to any image so broken asset paths still look intentional. */
  function withFallback(imgEl, title, subtitle, w, h) {
    imgEl.addEventListener('error', () => {
      imgEl.onerror = null;
      imgEl.src = placeholderSVG(title, subtitle, w, h);
    }, { once: true });
    return imgEl;
  }

  /* =====================================================================
     2. UTILITIES
  ===================================================================== */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* =====================================================================
     3. BOOKMARKS (localStorage)
  ===================================================================== */
  const BookmarkStore = {
    KEY: 'journeybegin_bookmarks',
    all() {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
      catch { return []; }
    },
    has(id) { return this.all().some(b => b.id === id); },
    toggle(item) {
      if (!requireLogin('Sign in to save bookmarks.')) return this.all();
      let list = this.all();
      if (list.some(b => b.id === item.id)) {
        list = list.filter(b => b.id !== item.id);
        toast('Removed from bookmarks');
      } else {
        list.push(item);
        toast('Bookmarked');
      }
      localStorage.setItem(this.KEY, JSON.stringify(list));
      renderBookmarkPanel();
      updateBookmarkCount();
      return list;
    },
    remove(id) {
      const list = this.all().filter(b => b.id !== id);
      localStorage.setItem(this.KEY, JSON.stringify(list));
      renderBookmarkPanel();
      updateBookmarkCount();
    }
  };

  function updateBookmarkCount() {
    const count = BookmarkStore.all().length;
    const badge = $('#bookmarkCount');
    badge.textContent = count;
    badge.dataset.zero = count === 0 ? 'true' : 'false';
  }

  function renderBookmarkPanel() {
    const list = BookmarkStore.all();
    const container = $('#bookmarkList');
    if (!list.length) {
      container.innerHTML = `<p class="empty-note">No bookmarks yet. Tap the crystal icon on any manga or chapter to save it here.</p>`;
      return;
    }
    container.innerHTML = list.map(item => `
      <div class="bookmark-row" data-id="${item.id}">
        <img src="${item.cover || ''}" alt="">
        <div>
          <div class="brtitle">${item.title}</div>
          <div class="brtype">${item.type}</div>
        </div>
        <button class="brremove" data-remove="${item.id}" aria-label="Remove bookmark">&times;</button>
      </div>
    `).join('');

    $$('img', container).forEach(img => withFallback(img, list.find(l=>l.cover===img.getAttribute('src'))?.title || '', '', 200, 260));
    $$('[data-remove]', container).forEach(btn => {
      btn.addEventListener('click', () => BookmarkStore.remove(btn.dataset.remove));
    });
  }

  /* =====================================================================
     4. RENDER: MANGA GRID
  ===================================================================== */
  function renderMangaGrid() {
    const grid = $('#mangaGrid');
    grid.innerHTML = DATA.manga.map(m => {
      const bookmarked = BookmarkStore.has('manga-' + m.id);
      const statusClass = m.status === 'Ongoing' ? 'status-ok' : 'status-soon';
      // Always jump into the earliest available chapter (e.g. Chapter 0 if
      // one exists) rather than assuming numbering always starts at 1.
      const availableChapters = getMangaChapters(m.id).filter(isChapterAvailable);
      const firstChapterNumber = availableChapters.length ? availableChapters[0].number : null;
      return `
      <article class="manga-card facet ${m.featured ? 'featured' : ''}" data-manga-id="${m.id}">
        <div class="cover">
          <span class="card-tag ${statusClass}">${m.status}</span>
          <button class="card-bookmark ${bookmarked ? 'active' : ''}" data-bookmark-manga="${m.id}" aria-label="Bookmark ${m.title}">
            <svg viewBox="0 0 24 24"><path d="M6 2h12a1 1 0 011 1v18l-7-4.2L5 21V3a1 1 0 011-1z"/></svg>
          </button>
          <img src="${m.cover}" alt="${m.title} cover">
        </div>
        <div class="body">
          <h3 class="title">${m.title}</h3>
          <div class="meta"><span>${m.genre}</span></div>
          <p class="desc">${m.description}</p>
          <div class="card-foot">
            ${firstChapterNumber !== null
              ? `<span class="read-link" data-open-reader data-manga="${m.id}" data-chapter="${firstChapterNumber}">Read Manga →</span>`
              : `<span class="read-link" style="cursor:default;opacity:.55;">Coming Soon</span>`}
            <span class="read-link" style="cursor:default;color:var(--text-low);border:none;">${m.chapters} ${m.chapters===1?'chapter':'chapters'}</span>
          </div>
        </div>
      </article>`;
    }).join('');

    $$('.manga-card img', grid).forEach(img => {
      const title = img.closest('.manga-card').querySelector('.title').textContent;
      withFallback(img, title, 'Journey Begin', 600, 800);
    });

    $$('[data-bookmark-manga]', grid).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = btn.dataset.bookmarkManga;
        const m = DATA.manga.find(x => x.id === id);
        BookmarkStore.toggle({ id: 'manga-' + id, type: 'Manga', title: m.title, cover: m.cover });
        btn.classList.toggle('active');
      });
    });

    $$('[data-open-reader]', grid).forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.textContent.includes('Coming Soon')) { e.preventDefault(); return; }
        e.preventDefault();
        openReader(el.dataset.manga, parseInt(el.dataset.chapter, 10));
      });
    });
  }

  /* =====================================================================
     5. RENDER: CHAPTER LIST
     Chapters that share an Arc name (set in admin) are grouped under an
     arc heading, in the order the arc first appears. Chapters with no
     arc set render as before, ungrouped. "Upcoming" chapters with an
     unlock time show a live "Locked" countdown that ticks every second
     and flips to unlocked in place the instant the time passes.
  ===================================================================== */
  let chapterCountdownTimer = null;

  function chapterCardHTML(ch) {
    const manga = DATA.manga.find(m => m.id === ch.manga);
    const available = isChapterAvailable(ch);
    const releaseTime = ch.status === 'Upcoming' ? getChapterReleaseTime(ch) : null;
    const counting = !available && releaseTime !== null && releaseTime > Date.now();

    let statusClass = 'soon';
    let statusLabel = ch.status || 'Coming Soon';
    if (available) { statusClass = 'ok'; statusLabel = 'Available'; }
    else if (ch.status === 'Upcoming') { statusClass = 'locked'; statusLabel = 'Locked'; }

    return `
      <article class="chapter-tile" data-chapter-manga="${ch.manga}" data-chapter-number="${ch.number}">
        <div class="chapter-tile-top">
          <span class="chapter-num">${String(ch.number).padStart(2,'0')}</span>
          <div class="chapter-status ${statusClass}" ${counting ? `data-countdown-chapter data-release-at="${releaseTime}"` : ''}>
            <span class="status-label">${statusLabel}</span>
            ${counting ? `<span class="chapter-countdown" data-countdown-text>${formatCountdown(releaseTime - Date.now())}</span>` : ''}
          </div>
        </div>
        <div class="chapter-info">
          <h4 class="cname">${ch.title}</h4>
          <div class="cmanga">${manga ? manga.title : ch.manga}</div>
        </div>
        <button class="chapter-read-btn" ${available ? '' : 'disabled'} data-open-reader data-manga="${ch.manga}" data-chapter="${ch.number}">
          ${available ? 'Read Chapter' : 'Locked'}
        </button>
      </article>`;
  }

  // One grid box per arc: the arc's name, its manga, how many chapters
  // it has / how many are unlocked, and a "Read Arc" button that opens
  // the dedicated arc page listing every chapter inside it.
  function arcCardHTML(group) {
    const manga = DATA.manga.find(m => m.id === group.manga);
    const total = group.items.length;
    const availableCount = group.items.filter(isChapterAvailable).length;

    let statusClass = 'soon';
    let statusText = `${total} chapter${total === 1 ? '' : 's'}`;
    if (availableCount === total) { statusClass = 'ok'; statusText = `${total} chapter${total === 1 ? '' : 's'} available`; }
    else if (availableCount > 0) { statusClass = 'soon'; statusText = `${availableCount}/${total} available`; }
    else { statusClass = 'locked'; statusText = `${total} chapter${total === 1 ? '' : 's'} · Locked`; }

    return `
      <article class="chapter-tile arc-card">
        <div class="chapter-tile-top">
          <span class="arc-badge">Arc</span>
          <div class="chapter-status ${statusClass}"><span class="status-label">${statusText}</span></div>
        </div>
        <div class="chapter-info">
          <h4 class="cname">${group.arc}</h4>
          <div class="cmanga">${manga ? manga.title : group.manga}</div>
        </div>
        <button class="chapter-read-btn" data-open-arc>Read Arc →</button>
      </article>`;
  }

  function renderChapterList() {
    const list = $('#chapterList');

    // Chapters that share an Arc name (per manga) collapse into a single
    // arc card, in first-seen order; chapters with no arc set each get
    // their own standalone card. Everything sits together in one grid.
    const groups = [];
    const groupByKey = new Map();
    DATA.chapters.forEach(ch => {
      const arcName = (ch.arc || '').trim();
      if (!arcName) { groups.push({ arc: null, manga: ch.manga, items: [ch] }); return; }
      const key = ch.manga + '||' + arcName;
      let group = groupByKey.get(key);
      if (!group) {
        group = { arc: arcName, manga: ch.manga, items: [] };
        groupByKey.set(key, group);
        groups.push(group);
      }
      group.items.push(ch);
    });

    list.innerHTML = `<div class="chapter-grid">${
      groups.map(g => g.arc ? arcCardHTML(g) : chapterCardHTML(g.items[0])).join('')
    }</div>`;

    $$('[data-open-reader]', list).forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        openReader(btn.dataset.manga, parseInt(btn.dataset.chapter, 10));
      });
    });

    const arcGroups = groups.filter(g => g.arc);
    $$('[data-open-arc]', list).forEach((btn, i) => {
      const group = arcGroups[i];
      if (!group) return;
      btn.addEventListener('click', () => openArcPage(group));
    });

    startChapterCountdowns();
  }

  /* =====================================================================
     5a. ARC PAGE — full-page overlay listing every chapter that belongs
     to one arc, opened via that arc's "Read Arc" button.
  ===================================================================== */
  function openArcPage(group) {
    const manga = DATA.manga.find(m => m.id === group.manga);
    $('#arcPageManga').textContent = manga ? manga.title : group.manga;
    $('#arcPageName').textContent = group.arc;

    const sorted = group.items.slice().sort((a, b) => a.number - b.number);
    const chaptersWrap = $('#arcPageChapters');
    chaptersWrap.innerHTML = sorted.map(chapterCardHTML).join('');

    $$('[data-open-reader]', chaptersWrap).forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        closeArcPage();
        openReader(btn.dataset.manga, parseInt(btn.dataset.chapter, 10));
      });
    });

    const page = $('#arcPage');
    page.classList.add('open');
    page.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.arc-page-body', page).scrollTop = 0;
    startChapterCountdowns();
  }

  function closeArcPage() {
    const page = $('#arcPage');
    page.classList.remove('open');
    page.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Ticks every locked "Upcoming" chapter's countdown once a second,
  // wherever it's currently rendered (homepage grid or the arc page).
  // When a chapter's unlock time passes, it's flipped to an unlocked
  // state right in the DOM (no re-render, no page refresh needed).
  function startChapterCountdowns() {
    if (chapterCountdownTimer) { clearInterval(chapterCountdownTimer); chapterCountdownTimer = null; }

    const tick = () => {
      const nodes = $$('[data-countdown-chapter]');
      if (!nodes.length) { clearInterval(chapterCountdownTimer); chapterCountdownTimer = null; return; }

      nodes.forEach(node => {
        const releaseAt = Number(node.dataset.releaseAt);
        if (!releaseAt) return;
        const remaining = releaseAt - Date.now();

        if (remaining <= 0) {
          node.removeAttribute('data-countdown-chapter');
          node.removeAttribute('data-release-at');
          node.classList.remove('locked');
          node.classList.add('ok');
          node.innerHTML = `<span class="status-label">Available</span>`;
          const card = node.closest('.chapter-tile');
          const btn = card && card.querySelector('.chapter-read-btn');
          if (btn) { btn.disabled = false; btn.textContent = 'Read Chapter'; }
          return;
        }

        const textEl = node.querySelector('[data-countdown-text]');
        if (textEl) textEl.textContent = formatCountdown(remaining);
      });
    };

    tick();
    chapterCountdownTimer = setInterval(tick, 1000);
  }

  /* =====================================================================
     5a. RENDER: SOCIAL MEDIA LINKS
     Populates the floating social dock and the footer social row from
     whatever links are set in the admin panel. Platforms with no link
     saved simply don't render — and if nothing is set at all, the
     floating dock stays hidden.
  ===================================================================== */
  function renderSocialLinks() {
    const links = DATA.social || {};
    const active = SOCIAL_PLATFORMS.filter(p => (links[p.key] || '').trim());

    const dock = document.getElementById('socialDock');
    const footer = document.getElementById('footerSocial');
    if (!dock && !footer) return;

    if (!active.length) {
      if (dock) dock.classList.remove('show');
      if (footer) footer.innerHTML = '';
      return;
    }

    const html = active.map(p => `
      <a class="social-btn" href="${links[p.key].trim()}" target="_blank" rel="noopener noreferrer" aria-label="${p.label}" title="${p.label}">
        ${SOCIAL_ICONS[p.key] || ''}
      </a>
    `).join('');

    if (dock) { dock.innerHTML = html; dock.classList.add('show'); }
    if (footer) footer.innerHTML = html;
  }

  /* =====================================================================
     5b. HERO "READ MANGA" BUTTON — the hero block is static HTML (it
     always points at the featured manga), so it needs to be kept in sync
     with that manga's actual first available chapter (e.g. Chapter 0)
     instead of the hardcoded "1" it ships with.
  ===================================================================== */
  function wireHeroReadButton() {
    const heroBtn = document.querySelector('.hero-actions [data-open-reader]');
    if (!heroBtn) return;
    const mangaId = heroBtn.dataset.manga;
    const availableChapters = getMangaChapters(mangaId).filter(isChapterAvailable);
    if (availableChapters.length) {
      heroBtn.dataset.chapter = availableChapters[0].number;
    }
    if (!heroBtn.dataset.wired) {
      heroBtn.dataset.wired = '1';
      heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openReader(heroBtn.dataset.manga, parseInt(heroBtn.dataset.chapter, 10));
      });
    }
  }

  /* =====================================================================
     6. RENDER: WORLD MAP
  ===================================================================== */
  function renderWorldMap() {
    const figure = $('#worldMapFigure');
    const figureImg = $('#worldMapFigureImg');
    if (!figure || !figureImg) return;

    if (DATA.worldMapImage) {
      figureImg.src = DATA.worldMapImage;
      withFallback(figureImg, 'World Map', 'Upload one in Admin', 1200, 500);
    } else {
      figureImg.src = placeholderSVG('World Map', 'Upload one in Admin', 1200, 500);
    }

    const open = () => openWorldMapLightbox();
    figure.addEventListener('click', open);
    figure.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  }

  function openWorldMapLightbox() {
    const lb = $('#lightbox');
    const img = $('#lightboxImg');
    img.src = DATA.worldMapImage || '';
    img.alt = 'World Map';
    withFallback(img, 'World Map', 'Upload one in Admin', 1200, 800);
    $('#lightboxCaption').textContent = 'World Map';
    lb.classList.add('open', 'single');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /* =====================================================================
     7. RENDER: CHARACTERS
  ===================================================================== */
  function renderCharacters() {
    const grid = $('#characterGrid');
    grid.innerHTML = DATA.characters.map(c => `
      <article class="char-card facet-sm" data-char="${c.id}" tabindex="0">
        <div class="portrait">
          <img src="${c.image}" alt="${c.name}">
          <div class="cinfo">
            <div class="cname">${c.name}</div>
            <div class="cage">Age ${c.age}</div>
          </div>
        </div>
        <p class="cshort">${c.short}</p>
      </article>
    `).join('');

    $$('.char-card img', grid).forEach(img => {
      const name = img.closest('.char-card').querySelector('.cname').textContent;
      withFallback(img, name, 'Character', 450, 600);
    });

    $$('.char-card', grid).forEach(card => {
      const open = () => openCharacterModal(card.dataset.char);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function openCharacterModal(id) {
    const c = DATA.characters.find(x => x.id === id);
    if (!c) return;
    const body = $('#charModalBody');
    body.innerHTML = `
      <div class="char-modal-hero">
        <img src="${c.image}" alt="${c.name}">
        <div class="char-modal-info">
          <h2>${c.name}</h2>
          <span class="cmage">Age ${c.age}</span>
          <p>${c.full}</p>
          <div class="ctraits">${c.traits.map(t => `<span class="ctrait">${t}</span>`).join('')}</div>
        </div>
      </div>
    `;
    withFallback($('img', body), c.name, 'Character', 450, 600);
    $('#charModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCharacterModal() {
    $('#charModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* =====================================================================
     8. RENDER: LORE ACCORDION
  ===================================================================== */
  function renderLore() {
    const wrap = $('#loreAccordion');
    wrap.innerHTML = DATA.lore.map((l, i) => `
      <div class="lore-item" data-lore="${l.id}">
        <button class="lore-head" aria-expanded="false">
          <span class="lname"><span class="lidx">${String(i+1).padStart(2,'0')}</span> ${l.title}</span>
          <span class="lplus">+</span>
        </button>
        <div class="lore-body"><div class="lore-body-inner">${l.body}</div></div>
      </div>
    `).join('');

    $$('.lore-item', wrap).forEach(item => {
      const head = $('.lore-head', item);
      const body = $('.lore-body', item);
      head.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // collapse all others (accordion behaviour) — comment out these two lines for independent toggles
        $$('.lore-item.open', wrap).forEach(o => { if (o !== item) collapseLore(o); });
        isOpen ? collapseLore(item) : expandLore(item);
      });
    });

    function expandLore(item) {
      item.classList.add('open');
      $('.lore-head', item).setAttribute('aria-expanded', 'true');
      const body = $('.lore-body', item);
      body.style.maxHeight = body.scrollHeight + 'px';
    }
    function collapseLore(item) {
      item.classList.remove('open');
      $('.lore-head', item).setAttribute('aria-expanded', 'false');
      $('.lore-body', item).style.maxHeight = null;
    }
  }

  /* =====================================================================
     9. RENDER: GALLERY + LIGHTBOX
  ===================================================================== */
  let currentGalleryFiltered = [];
  let currentLightboxIndex = 0;

  function renderGallery() {
    const grid = $('#galleryGrid');
    grid.innerHTML = DATA.gallery.map((g, i) => `
      <div class="gallery-item" data-index="${i}" data-category="${g.category}">
        <img src="${g.src}" alt="${g.caption}">
        <div class="gcap">${g.caption}</div>
      </div>
    `).join('');

    $$('.gallery-item img', grid).forEach((img, i) => withFallback(img, DATA.gallery[i].caption, DATA.gallery[i].category, 600, 800));

    $$('.gallery-item', grid).forEach(item => {
      item.addEventListener('click', () => {
        currentGalleryFiltered = getVisibleGalleryIndices();
        currentLightboxIndex = currentGalleryFiltered.indexOf(parseInt(item.dataset.index, 10));
        openLightbox();
      });
    });

    $$('.gallery-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        $$('.gallery-item', grid).forEach(item => {
          item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
        });
      });
    });
  }

  function getVisibleGalleryIndices() {
    return $$('.gallery-item').filter(i => !i.classList.contains('hidden')).map(i => parseInt(i.dataset.index, 10));
  }

  function openLightbox() {
    const lb = $('#lightbox');
    updateLightbox();
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    $('#lightbox').classList.remove('open', 'single');
    $('#lightbox').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function updateLightbox() {
    const idx = currentGalleryFiltered[currentLightboxIndex];
    const item = DATA.gallery[idx];
    const img = $('#lightboxImg');
    img.src = item.src;
    img.alt = item.caption;
    withFallback(img, item.caption, item.category, 900, 1200);
    $('#lightboxCaption').textContent = item.caption;
  }
  function lightboxStep(dir) {
    if (!currentGalleryFiltered.length) return;
    currentLightboxIndex = (currentLightboxIndex + dir + currentGalleryFiltered.length) % currentGalleryFiltered.length;
    updateLightbox();
  }

  /* =====================================================================
     10. RENDER: NEWS
  ===================================================================== */
  function renderNews() {
    const grid = $('#newsGrid');
    grid.innerHTML = DATA.news.map(n => `
      <article class="news-card">
        <span class="news-date">${n.date}</span>
        <span class="news-tag">${n.tag}</span>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-desc">${n.desc}</p>
      </article>
    `).join('');
  }

  /* =====================================================================
     11. MANGA READER
  ===================================================================== */
  const ReaderState = { manga: null, chapter: null, zoom: 100 };

  function getMangaChapters(mangaId) {
    return DATA.chapters.filter(c => c.manga === mangaId).sort((a,b) => a.number - b.number);
  }

  /* =====================================================================
     10a. CHAPTER UNLOCK TIMING
     A chapter can be marked "Upcoming" in admin with an exact unlock
     moment (releaseAt, stored as an ISO/UTC string). Until that moment
     passes it counts as locked everywhere on the site; the instant it
     passes it's treated as Available automatically, no admin action or
     page reload needed.
  ===================================================================== */
  function getChapterReleaseTime(ch) {
    if (!ch || !ch.releaseAt) return null;
    const t = new Date(ch.releaseAt).getTime();
    return isNaN(t) ? null : t;
  }

  function isChapterAvailable(ch) {
    if (!ch) return false;
    if (ch.status === 'Available') return true;
    if (ch.status === 'Upcoming') {
      const releaseTime = getChapterReleaseTime(ch);
      return releaseTime !== null && releaseTime <= Date.now();
    }
    return false;
  }

  // "23h 59m 1s left" while under a day remains; once a full day or more
  // remains, collapses to whole days only ("2 days left") — no live
  // minutes/seconds ticking at that resolution.
  function formatCountdown(msRemaining) {
    const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000));
    const days = Math.floor(totalSeconds / 86400);
    if (days >= 1) return `${days} day${days === 1 ? '' : 's'} left`;
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s left`;
  }

  async function openReader(mangaId, chapterNumber) {
    const manga = DATA.manga.find(m => m.id === mangaId);
    const chapters = getMangaChapters(mangaId);
    const chapter = chapters.find(c => c.number === chapterNumber);
    if (!manga || !chapter) return;

    ReaderState.manga = mangaId;
    ReaderState.chapter = chapterNumber;
    ReaderState.zoom = 100;
    updateZoomUI();

    $('#readerMangaTitle').textContent = manga.title;
    $('#readerChapterTitle').textContent = `Chapter ${chapter.number} — ${chapter.title}`;

    const pagesWrap = $('#readerPages');

    // Fetch this chapter's actual page images only when it's opened, not
    // ahead of time — keeps the rest of the site fast regardless of how
    // many chapters/pages exist. Once fetched, cached on the chapter object
    // so flipping back to it later in the same session is instant.
    if (chapter.pageImages === undefined && window.jbFirebase && window.jbFirebase.db) {
      pagesWrap.innerHTML = `<div class="reader-loading-page">Loading pages…</div>`;
      try {
        const snap = await window.jbFirebase.db
          .collection('chapters').doc(chapter.id)
          .collection('pageImages').orderBy('order').get();
        chapter.pageImages = snap.empty ? null : snap.docs.map(p => p.data().data);
      } catch (e) {
        chapter.pageImages = null;
      }
      // Bail out if the reader was closed or navigated elsewhere while this
      // chapter's pages were loading.
      if (ReaderState.manga !== mangaId || ReaderState.chapter !== chapterNumber) return;
    }

    pagesWrap.innerHTML = '';

    // Prefer explicit page images (from admin, fetched above). Fall back to
    // the assets/ folder naming convention for chapters managed by hand.
    const pageImages = Array.isArray(chapter.pageImages) && chapter.pageImages.length
      ? chapter.pageImages
      : null;
    const pageCount = pageImages ? pageImages.length : (chapter.pages || 5);

    for (let p = 1; p <= pageCount; p++) {
      const num = String(p).padStart(2, '0');
      const src = pageImages ? pageImages[p - 1] : `assets/manga/${mangaId}/chapter-${chapter.number}/page-${num}.jpg`;
      const div = document.createElement('div');
      div.className = 'reader-page-wrap';
      div.innerHTML = `<img data-page="${p}" src="${src}" alt="Page ${p}" loading="lazy">`;
      pagesWrap.appendChild(div);
      const img = $('img', div);
      img.addEventListener('error', () => {
        img.onerror = null;
        div.innerHTML = `<div class="reader-loading-page">Page ${num} — drop your art at<br>${src}</div>`;
      }, { once: true });
    }

    // Comments live at the bottom of the scrollable page area, after the
    // last page — same section reused/rebuilt each time a chapter opens.
    const commentsDiv = document.createElement('div');
    commentsDiv.className = 'reader-comments';
    commentsDiv.id = 'readerComments';
    pagesWrap.appendChild(commentsDiv);
    renderChapterComments(chapter.id);

    updateReaderNavButtons(chapters, chapter);
    const reader = $('#reader');
    reader.classList.add('open');
    reader.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    pagesWrap.scrollTop = 0;
    updateReaderProgress();
  }

  function closeReader() {
    const reader = $('#reader');
    reader.classList.remove('open');
    reader.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    exitReaderFullscreen();
  }

  // ---------------------------------------------------------------------
  // Cross-browser fullscreen helpers.
  // Standard Fullscreen API is missing/prefixed on many mobile browsers
  // (iOS Safari never implements it for non-video elements at all), so we
  // fall back to a CSS-driven "fake fullscreen" that hides the reader's
  // top/bottom bars and expands the page area — this is what actually
  // fixes the button doing nothing on phones.
  // ---------------------------------------------------------------------
  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement ||
      document.mozFullScreenElement || document.msFullscreenElement || null;
  }

  function isFullscreenApiSupported(el) {
    return !!(el.requestFullscreen || el.webkitRequestFullscreen ||
      el.mozRequestFullScreen || el.msRequestFullscreen);
  }

  function requestFullscreenOn(el) {
    const fn = el.requestFullscreen || el.webkitRequestFullscreen ||
      el.mozRequestFullScreen || el.msRequestFullscreen;
    if (!fn) return Promise.reject(new Error('unsupported'));
    try {
      const result = fn.call(el);
      return result && result.then ? result : Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function exitNativeFullscreen() {
    const fn = document.exitFullscreen || document.webkitExitFullscreen ||
      document.mozCancelFullScreen || document.msExitFullscreen;
    if (!fn) return Promise.resolve();
    try {
      const result = fn.call(document);
      return result && result.then ? result : Promise.resolve();
    } catch {
      return Promise.resolve();
    }
  }

  function setFullscreenBtnState(isFs) {
    const btn = $('#fullscreenBtn');
    if (btn) btn.classList.toggle('is-active', isFs);
  }

  function toggleReaderFullscreen() {
    const reader = $('#reader');
    const usingFallback = reader.classList.contains('reader-fs-fallback');

    if (getFullscreenElement() === reader || usingFallback) {
      exitReaderFullscreen();
      return;
    }

    if (isFullscreenApiSupported(reader)) {
      requestFullscreenOn(reader)
        .then(() => setFullscreenBtnState(true))
        .catch(() => {
          // Native API present but rejected the request (common in-app
          // browsers / iframes) — fall back to the CSS-only mode.
          reader.classList.add('reader-fs-fallback');
          setFullscreenBtnState(true);
        });
    } else {
      // No Fullscreen API at all (e.g. iOS Safari) — use the CSS fallback.
      reader.classList.add('reader-fs-fallback');
      setFullscreenBtnState(true);
    }
  }

  function exitReaderFullscreen() {
    const reader = $('#reader');
    reader.classList.remove('reader-fs-fallback');
    if (getFullscreenElement()) exitNativeFullscreen();
    setFullscreenBtnState(false);
  }

  document.addEventListener('fullscreenchange', () => setFullscreenBtnState(!!getFullscreenElement()));
  document.addEventListener('webkitfullscreenchange', () => setFullscreenBtnState(!!getFullscreenElement()));
  document.addEventListener('mozfullscreenchange', () => setFullscreenBtnState(!!getFullscreenElement()));
  document.addEventListener('MSFullscreenChange', () => setFullscreenBtnState(!!getFullscreenElement()));

  function updateReaderNavButtons(chapters, current) {
    const idx = chapters.findIndex(c => c.number === current.number);
    const prevBtn = $('#prevChapter');
    const nextBtn = $('#nextChapter');
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= chapters.length - 1 || !isChapterAvailable(chapters[idx+1]);
    prevBtn.onclick = () => { if (idx > 0) openReader(ReaderState.manga, chapters[idx-1].number); };
    nextBtn.onclick = () => { if (idx < chapters.length - 1 && isChapterAvailable(chapters[idx+1])) openReader(ReaderState.manga, chapters[idx+1].number); };
  }

  function updateZoomUI() {
    $('#zoomLevel').textContent = ReaderState.zoom + '%';
    document.documentElement.style.setProperty('--reader-zoom', ReaderState.zoom + '%');
  }

  function updateReaderProgress() {
    const pagesWrap = $('#readerPages');
    const wraps = $$('.reader-page-wrap', pagesWrap);
    if (!wraps.length) return;
    const scrollMid = pagesWrap.scrollTop + pagesWrap.clientHeight / 2;
    let current = 1;
    wraps.forEach((w, i) => { if (w.offsetTop <= scrollMid) current = i + 1; });
    $('#readerProgress').textContent = `Page ${current} / ${wraps.length}`;
  }

  /* =====================================================================
     12. SEARCH
  ===================================================================== */
  function buildSearchIndex() {
    const index = [];
    DATA.manga.forEach(m => index.push({ type: 'Manga', title: m.title, sub: m.genre, action: () => { closeSearch(); scrollToId('manga'); } }));
    DATA.characters.forEach(c => index.push({ type: 'Character', title: c.name, sub: `Age ${c.age}`, action: () => { closeSearch(); openCharacterModal(c.id); } }));
    DATA.chapters.forEach(c => index.push({ type: 'Chapter', title: `Ch. ${c.number} — ${c.title}`, sub: isChapterAvailable(c) ? 'Available' : (c.status === 'Upcoming' ? 'Locked' : c.status), action: () => { closeSearch(); if (isChapterAvailable(c)) openReader(c.manga, c.number); else scrollToId('discover'); } }));
    index.push({ type: 'Location', title: 'World Map', sub: 'Explore the World', action: () => { closeSearch(); scrollToId('world'); } });
    DATA.lore.forEach(l => index.push({ type: 'Lore', title: l.title, sub: 'Lore & Mysteries', action: () => { closeSearch(); scrollToId('lore'); } }));
    DATA.news.forEach(n => index.push({ type: 'News', title: n.title, sub: n.tag, action: () => { closeSearch(); scrollToId('news'); } }));
    return index;
  }
  let SEARCH_INDEX = [];

  function runSearch(query) {
    const results = $('#searchResults');
    if (!query.trim()) {
      results.innerHTML = `<p class="search-hint">Try “Felix”, “Chapter 2”, “Kingdom”, or “Crystal”.</p>`;
      return;
    }
    const q = query.toLowerCase();
    const matches = SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q));

    if (!matches.length) {
      results.innerHTML = `<p class="search-hint">No results for “${query}”. Try another term.</p>`;
      return;
    }

    const groups = {};
    matches.forEach(m => { (groups[m.type] = groups[m.type] || []).push(m); });

    results.innerHTML = Object.entries(groups).map(([type, items]) => `
      <div class="search-result-group">
        <h4>${type}</h4>
        ${items.map((it, i) => `<div class="search-result-item" data-group="${type}" data-i="${i}">
          <span>${it.title}</span><span class="srtype">${it.sub}</span>
        </div>`).join('')}
      </div>
    `).join('');

    $$('.search-result-item', results).forEach(el => {
      const item = groups[el.dataset.group][parseInt(el.dataset.i, 10)];
      el.addEventListener('click', item.action);
    });
  }

  function openSearch() {
    $('#searchOverlay').classList.add('open');
    setTimeout(() => $('#searchInput').focus(), 250);
  }
  function closeSearch() {
    $('#searchOverlay').classList.remove('open');
    $('#searchInput').value = '';
    runSearch('');
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* =====================================================================
     13. NAV / SCROLL BEHAVIOUR / REVEALS / PARALLAX
  ===================================================================== */
  function initNav() {
    const nav = $('#siteNav');
    const navLinks = $$('.nav-link');
    const sections = ['home','manga','discover','world','characters','news','reviews'].map(id => document.getElementById(id)).filter(Boolean);

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);

      // scroll progress bar
      const total = document.documentElement.scrollHeight - window.innerHeight;
      $('#scrollProgress').style.width = (window.scrollY / total * 100) + '%';

      // active link tracking
      let currentId = sections[0]?.id;
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) currentId = sec.id; });
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));
    }, { passive: true });

    $$('[data-nav-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeMobileMenu();
          const acctOverlay = $('#accountOverlay');
          if (acctOverlay) acctOverlay.classList.remove('open');
          scrollToId(href.slice(1));
        }
      });
    });
  }

  function initHamburger() {
    const btn = $('#hamburgerBtn');
    const links = $('#navLinks');
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  function closeMobileMenu() {
    $('#navLinks').classList.remove('open');
    $('#hamburgerBtn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$('.reveal, .reveal-up').forEach(el => io.observe(el));
  }

  /* =====================================================================
     13b. READER ACCOUNTS (Firebase Auth) & CHAPTER COMMENTS
  ===================================================================== */
  const Auth = {
    user: null,       // Firebase Auth user object, or null when logged out
    ready: false,     // becomes true once the first auth state is known
    photoData: null,  // compressed profile-photo data URL for the current user, or null
    listeners: []
  };

  function onAuthChange(cb) {
    Auth.listeners.push(cb);
    if (Auth.ready) cb(Auth.user);
  }

  function initAuth() {
    const fb = window.jbFirebase;
    if (!fb || !fb.auth) return;
    fb.auth.onAuthStateChanged(async (user) => {
      Auth.user = user;
      Auth.ready = true;
      Auth.photoData = user ? await fetchUserPhoto(user.uid) : null;
      updateAccountUI(user);
      Auth.listeners.forEach(cb => cb(user));
    });
  }

  /* ---- Profile photo storage (same pattern as the admin panel: images are
     compressed client-side and stored as data-URL strings directly in
     Firestore, no Firebase Storage/billing needed) & a small per-uid cache
     so chapter comments can show a picture next to a reader's name without
     re-fetching the same profile doc over and over. ---- */
  const AvatarPhotoCache = new Map(); // uid -> data URL string or null

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImageEl(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawAvatarDataURL(img, maxDim, quality) {
    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    // Square-crop to the smaller dimension so avatars fill a circle cleanly.
    const side = Math.min(width, height);
    const canvas = document.createElement('canvas');
    canvas.width = side;
    canvas.height = side;
    const ctx = canvas.getContext('2d');
    const sx = (img.width - Math.min(img.width, img.height)) / 2;
    const sy = (img.height - Math.min(img.width, img.height)) / 2;
    const srcSide = Math.min(img.width, img.height);
    ctx.drawImage(img, sx, sy, srcSide, srcSide, 0, 0, side, side);
    return canvas.toDataURL('image/jpeg', quality);
  }

  async function fileToAvatarDataURL(file, maxBytes = 120000) {
    const raw = await readFileAsDataURL(file);
    const img = await loadImageEl(raw);
    let maxDim = 320;
    let quality = 0.82;
    let dataUrl = drawAvatarDataURL(img, maxDim, quality);
    let attempts = 0;
    while (dataUrl.length > maxBytes && attempts < 6) {
      quality = Math.max(0.4, quality - 0.12);
      maxDim = Math.round(maxDim * 0.85);
      dataUrl = drawAvatarDataURL(img, maxDim, quality);
      attempts++;
    }
    return dataUrl;
  }

  async function fetchUserPhoto(uid) {
    if (AvatarPhotoCache.has(uid)) return AvatarPhotoCache.get(uid);
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return null;
    try {
      const doc = await fb.db.collection('users').doc(uid).get();
      const photo = (doc.exists && doc.data().photoData) || null;
      AvatarPhotoCache.set(uid, photo);
      return photo;
    } catch (e) {
      AvatarPhotoCache.set(uid, null);
      return null;
    }
  }

  async function saveUserPhoto(uid, dataUrl) {
    const fb = window.jbFirebase;
    await fb.db.collection('users').doc(uid).set({ photoData: dataUrl }, { merge: true });
    AvatarPhotoCache.set(uid, dataUrl);
  }

  // Shared avatar markup: a photo <img> when one exists, otherwise the
  // reader's initial letter — used by the account panel, the register
  // preview, and every comment/reply row.
  function avatarInnerHTML(name, photoData) {
    if (photoData) return `<img src="${photoData}" alt="">`;
    const initial = (name || '?').trim().charAt(0).toUpperCase() || '?';
    return escapeHTMLComment(initial);
  }

  function updateAccountUI(user) {
    const authView = $('#accountAuthView');
    const profileView = $('#accountProfileView');
    const accountBtn = $('#accountToggle');
    const navAvatar = $('#navAvatar');
    if (user) {
      authView.classList.add('hidden');
      profileView.classList.remove('hidden');
      const name = user.displayName || user.email || 'Reader';
      $('#accountName').textContent = name;
      $('#accountEmail').textContent = user.email || '';
      $('#accountAvatar').innerHTML = avatarInnerHTML(name, Auth.photoData);
      // Header account button: show the reader's own profile picture (or
      // initial) in a circle instead of the generic person icon.
      if (accountBtn && navAvatar) {
        navAvatar.innerHTML = avatarInnerHTML(name, Auth.photoData);
        navAvatar.classList.remove('hidden');
        accountBtn.classList.add('logged-in');
      }
      // Collapse the change-password form back to its resting state on
      // every auth refresh (e.g. after signing in as someone else).
      $('#accountChangePasswordForm').classList.add('hidden');
      $('#accountPasswordToggle').classList.remove('revealed');
    } else {
      authView.classList.remove('hidden');
      profileView.classList.add('hidden');
      if (accountBtn && navAvatar) {
        navAvatar.classList.add('hidden');
        navAvatar.innerHTML = '';
        accountBtn.classList.remove('logged-in');
      }
    }

    // Refresh the reviews section (sign-in note vs. form, "You" tag, own
    // edit/delete controls) if it has already loaded, so login state
    // changes are reflected immediately without waiting on a reload.
    if (ReviewsState.loaded) {
      renderReviewForm();
      renderReviewsList();
    }

    // If a chapter is currently open in the reader, refresh its comments so
    // the comment form / like buttons reflect the new login state right away.
    if ($('#reader').classList.contains('open') && ReaderState.manga && ReaderState.chapter) {
      const chapters = getMangaChapters(ReaderState.manga);
      const chapter = chapters.find(c => c.number === ReaderState.chapter);
      if (chapter) renderChapterComments(chapter.id);
    }
  }

  function friendlyAuthError(err) {
    const code = (err && err.code) || '';
    if (code.includes('email-already-in-use')) return 'That email is already registered — try signing in instead.';
    if (code.includes('weak-password')) return 'Password should be at least 6 characters.';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) return 'Incorrect email or password.';
    if (code.includes('invalid-email')) return 'That email address looks invalid.';
    if (code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.';
    return 'Something went wrong. Please try again.';
  }

  // Generic show/hide toggle for any password <input> — used on the login,
  // register, and change-password fields. Purely a typing aid: it never
  // reveals a password the reader didn't just type into that same field.
  function wirePasswordEyeToggle(btn) {
    const targetId = btn.dataset.togglePassword;
    const input = document.getElementById(targetId);
    if (!input) return;
    btn.addEventListener('click', () => {
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.classList.toggle('revealed', !showing);
      btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
  }

  function initAccountForms() {
    const fb = window.jbFirebase;
    initAuth();

    $$('[data-toggle-password]').forEach(wirePasswordEyeToggle);

    $$('.account-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.account-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const which = tab.dataset.accountTab;
        $('#accountLoginForm').classList.toggle('hidden', which !== 'login');
        $('#accountRegisterForm').classList.toggle('hidden', which !== 'register');
        $('#accountError').classList.add('hidden');
      });
    });

    $('#accountLoginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = $('#accountError');
      errEl.classList.add('hidden');
      if (!fb || !fb.auth) return;
      try {
        await fb.auth.signInWithEmailAndPassword($('#acctLoginEmail').value.trim(), $('#acctLoginPassword').value);
        $('#accountOverlay').classList.remove('open');
        toast('Signed in.');
      } catch (err) {
        errEl.textContent = friendlyAuthError(err);
        errEl.classList.remove('hidden');
      }
    });

    // Registration profile-picture picker: compresses the chosen image
    // client-side and keeps it staged in memory until the account is
    // actually created (Firebase doesn't have a user to attach it to yet).
    let pendingRegAvatar = null;
    $('#acctRegAvatarInput').addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        pendingRegAvatar = await fileToAvatarDataURL(file);
        $('#acctRegAvatarPreview').innerHTML = `<img src="${pendingRegAvatar}" alt="">`;
        $('#acctRegAvatarClear').classList.remove('hidden');
      } catch (err) {
        toast('Could not read that image.', true);
      }
    });
    $('#acctRegAvatarClear').addEventListener('click', () => {
      pendingRegAvatar = null;
      $('#acctRegAvatarInput').value = '';
      $('#acctRegAvatarPreview').innerHTML = '?';
      $('#acctRegAvatarClear').classList.add('hidden');
    });

    $('#accountRegisterForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = $('#accountError');
      errEl.classList.add('hidden');
      if (!fb || !fb.auth) return;
      const name = $('#acctRegName').value.trim();
      const email = $('#acctRegEmail').value.trim();
      const password = $('#acctRegPassword').value;
      try {
        const cred = await fb.auth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName: name });
        const profileDoc = { displayName: name, email };
        if (pendingRegAvatar) profileDoc.photoData = pendingRegAvatar;
        await fb.db.collection('users').doc(cred.user.uid).set(profileDoc, { merge: true });
        if (pendingRegAvatar) AvatarPhotoCache.set(cred.user.uid, pendingRegAvatar);
        Auth.photoData = pendingRegAvatar || null;
        pendingRegAvatar = null;
        $('#acctRegAvatarInput').value = '';
        $('#acctRegAvatarPreview').innerHTML = '?';
        $('#acctRegAvatarClear').classList.add('hidden');
        updateAccountUI(fb.auth.currentUser);
        $('#accountOverlay').classList.remove('open');
        toast('Account created — welcome!');
      } catch (err) {
        errEl.textContent = friendlyAuthError(err);
        errEl.classList.remove('hidden');
      }
    });

    // Change profile picture from the logged-in profile view.
    $('#acctProfileAvatarInput').addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = '';
      if (!file || !Auth.user) return;
      try {
        const dataUrl = await fileToAvatarDataURL(file);
        await saveUserPhoto(Auth.user.uid, dataUrl);
        Auth.photoData = dataUrl;
        $('#accountAvatar').innerHTML = avatarInnerHTML(Auth.user.displayName || Auth.user.email, dataUrl);
        toast('Profile picture updated.');
        if ($('#reader').classList.contains('open') && ReaderState.manga && ReaderState.chapter) {
          const chapters = getMangaChapters(ReaderState.manga);
          const chapter = chapters.find(c => c.number === ReaderState.chapter);
          if (chapter) renderChapterComments(chapter.id);
        }
      } catch (err) {
        toast('Could not update profile picture: ' + (err.message || err), true);
      }
    });

    // Password row: Firebase never exposes a stored password (it's hashed,
    // not reversible), so the eye icon here opens the secure equivalent —
    // a change-password form that confirms identity with the current
    // password before setting a new one.
    $('#accountPasswordToggle').addEventListener('click', () => {
      const form = $('#accountChangePasswordForm');
      const opening = form.classList.contains('hidden');
      form.classList.toggle('hidden', !opening);
      $('#accountPasswordToggle').classList.toggle('revealed', opening);
      if (!opening) {
        form.reset();
        $('#accountPasswordError').classList.add('hidden');
      }
    });

    $('#accountChangePasswordForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = $('#accountPasswordError');
      errEl.classList.add('hidden');
      const user = Auth.user;
      if (!user || !user.email) return;
      const currentPassword = $('#acctCurrentPassword').value;
      const newPassword = $('#acctNewPassword').value;
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const credential = fb.firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
        e.target.reset();
        $('#accountChangePasswordForm').classList.add('hidden');
        $('#accountPasswordToggle').classList.remove('revealed');
        toast('Password updated.');
      } catch (err) {
        errEl.textContent = friendlyAuthError(err);
        errEl.classList.remove('hidden');
      } finally {
        btn.disabled = false;
      }
    });

    $('#accountLogoutBtn').addEventListener('click', async () => {
      if (!fb || !fb.auth) return;
      await fb.auth.signOut();
      toast('Signed out.');
    });
  }

  function requireLogin(promptMessage) {
    if (Auth.user) return true;
    toast(promptMessage || 'Please sign in first.', true);
    $('#accountOverlay').classList.add('open');
    return false;
  }

  /* ---- Chapter comments (Instagram-style: single like, threaded replies,
     collapsed-by-default extra replies, quick-emoji compose bar) ----
     Comments for the open chapter are fetched once into CommentsState, then
     every action (post/like/reply) patches just the affected DOM node
     instead of re-rendering the whole list — this is what removes the
     "whole section refreshes" flash on every click. ---- */
  const QUICK_EMOJIS = ['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'];
  const CommentsState = { chapterId: null, comments: [] };
  const COMMENT_EDIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day

  function tsMillis(ts) {
    if (!ts) return 0;
    if (typeof ts.toMillis === 'function') return ts.toMillis();
    if (typeof ts.toDate === 'function') return ts.toDate().getTime();
    return 0;
  }

  // A reader can edit/delete their own comment (or reply) only for 1 day
  // after posting it — matches the same window enforced server-side in
  // firestore.rules, so the buttons simply disappear once it expires.
  function canModifyComment(c, user) {
    if (!user || !c || c.uid !== user.uid) return false;
    const postedAt = tsMillis(c.createdAt) || Date.now(); // just-posted local placeholder
    return (Date.now() - postedAt) < COMMENT_EDIT_WINDOW_MS;
  }

  function timeAgo(date) {
    if (!date) return '';
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return 'now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d`;
    return date.toLocaleDateString();
  }

  function escapeHTMLComment(s = '') {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  async function fetchChapterComments(chapterId) {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return [];
    try {
      const snap = await fb.db.collection('comments').where('chapterId', '==', chapterId).get();
      const comments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      await Promise.all(comments.map(async c => {
        try {
          const rSnap = await fb.db.collection('comments').doc(c.id).collection('replies').get();
          c.replies = rSnap.docs.map(rd => ({ id: rd.id, ...rd.data() }));
          c.replies.sort((a, b) => tsMillis(a.createdAt) - tsMillis(b.createdAt));
        } catch (e) { c.replies = []; }
      }));
      comments.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt));
      await preloadAuthorPhotos(comments);
      return comments;
    } catch (err) {
      console.warn('Could not load comments', err);
      return [];
    }
  }

  // Batch-loads (and caches) the profile photo for every distinct commenter
  // on this chapter, so each comment/reply avatar can show a picture
  // instead of just an initial letter without one Firestore read per row.
  async function preloadAuthorPhotos(comments) {
    const uids = new Set();
    comments.forEach(c => {
      if (c.uid) uids.add(c.uid);
      (c.replies || []).forEach(r => { if (r.uid) uids.add(r.uid); });
    });
    await Promise.all(Array.from(uids).map(uid => fetchUserPhoto(uid)));
  }

  function likeButtonHTML(item, user) {
    const likedBy = Array.isArray(item.likedBy) ? item.likedBy : [];
    const liked = user && likedBy.includes(user.uid);
    return `<button type="button" class="ig-like-btn ${liked ? 'liked' : ''}" data-like="${item.id}">
      <svg viewBox="0 0 24 24"><path d="M12 21s-7.2-4.5-9.6-9C.7 8.8 2 5 5.6 4.2c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1C19.2 5 20.5 8.8 18.8 12c-2.4 4.5-9.6 9-9.6 9z"/></svg>
      <span class="ig-like-count">${likedBy.length || ''}</span>
    </button>`;
  }

  function commentRowHTML(c, user, isReply) {
    const when = c.createdAt && c.createdAt.toDate ? timeAgo(c.createdAt.toDate()) : 'now';
    const photo = c.uid ? AvatarPhotoCache.get(c.uid) : null;
    const canModify = canModifyComment(c, user);
    return `
      <div class="comment-row ${isReply ? 'is-reply' : ''}" data-comment="${c.id}">
        <div class="comment-avatar">${avatarInnerHTML(c.authorName, photo)}</div>
        <div class="comment-body">
          <div class="comment-line">
            <span class="comment-author">${escapeHTMLComment(c.authorName || 'Reader')}</span>
            <span class="comment-time">${when}</span>
            ${c.editedAt ? '<span class="comment-edited-tag">(edited)</span>' : ''}
          </div>
          <div class="comment-text">${escapeHTMLComment(c.text || '')}</div>
          <div class="comment-actions">
            ${!isReply ? `<button type="button" class="comment-reply-toggle" data-reply-toggle="${c.id}">Reply</button>` : ''}
            ${canModify ? `<button type="button" class="comment-edit-toggle" data-edit-toggle="${c.id}">Edit</button>` : ''}
            ${canModify ? `<button type="button" class="comment-delete-toggle" data-delete="${c.id}">Delete</button>` : ''}
          </div>
        </div>
        ${likeButtonHTML(c, user)}
      </div>`;
  }

  function commentEditFormHTML(c, isReply) {
    return `
      <div class="comment-row ${isReply ? 'is-reply' : ''}" data-comment="${c.id}" data-editing="${c.id}">
        <div class="comment-avatar">${avatarInnerHTML(c.authorName, c.uid ? AvatarPhotoCache.get(c.uid) : null)}</div>
        <div class="comment-body">
          <div class="comment-line"><span class="comment-author">${escapeHTMLComment(c.authorName || 'Reader')}</span></div>
          <form class="comment-edit-form" data-edit-form="${c.id}">
            <textarea id="editInput-${c.id}" maxlength="${isReply ? 1000 : 2000}" required>${escapeHTMLComment(c.text || '')}</textarea>
            <div class="comment-edit-actions">
              <button type="button" class="comment-edit-cancel" data-edit-cancel="${c.id}">Cancel</button>
              <button type="submit" class="comment-edit-save">Save</button>
            </div>
          </form>
        </div>
      </div>`;
  }

  function repliesBlockHTML(c, user) {
    const replies = c.replies || [];
    if (!replies.length) return `<div class="comment-replies" id="replies-${c.id}"></div>`;
    const [first, ...rest] = replies;
    const restHTML = rest.map(r => commentRowHTML(r, user, true)).join('');
    return `
      <div class="comment-replies" id="replies-${c.id}">
        ${commentRowHTML(first, user, true)}
        ${rest.length ? `
          <button type="button" class="view-more-replies" data-view-more="${c.id}">
            <span class="line"></span> View ${rest.length} more ${rest.length === 1 ? 'reply' : 'replies'}
          </button>
          <div class="more-replies hidden" id="more-replies-${c.id}">${restHTML}</div>
        ` : ''}
      </div>`;
  }

  function quickEmojiBarHTML(targetTextareaId) {
    return `<div class="quick-emoji-bar" data-for="${targetTextareaId}">
      ${QUICK_EMOJIS.map(e => `<button type="button" class="quick-emoji-btn" data-emoji="${e}">${e}</button>`).join('')}
    </div>`;
  }

  function wireQuickEmojiBar(barEl) {
    if (!barEl) return;
    const targetId = barEl.dataset.for;
    const textarea = document.getElementById(targetId);
    if (!textarea) return;
    $$('.quick-emoji-btn', barEl).forEach(btn => {
      btn.addEventListener('click', () => {
        textarea.value += btn.dataset.emoji;
        textarea.focus();
      });
    });
  }

  function wireCommentRowInteractions(rowOrForm) {
    // Like button
    $$('[data-like]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => toggleLike(btn.dataset.like, btn));
    });
    // Reply toggle
    $$('[data-reply-toggle]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => {
        if (!requireLogin('Sign in to reply to comments.')) return;
        showReplyForm(btn.dataset.replyToggle);
      });
    });
    // View more replies
    $$('[data-view-more]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => {
        const commentId = btn.dataset.viewMore;
        $('#more-replies-' + commentId).classList.remove('hidden');
        btn.classList.add('hidden');
      });
    });
    // Edit (own comment/reply, within the 1-day window)
    $$('[data-edit-toggle]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => showCommentEditForm(btn.dataset.editToggle));
    });
    // Delete (own comment/reply, within the 1-day window)
    $$('[data-delete]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => deleteCommentOrReply(btn.dataset.delete));
    });
  }

  // Lightweight in-page confirm dialog — native window.confirm() is
  // blocked in some embedded/sandboxed preview contexts.
  function customConfirm(message, confirmLabel = 'Confirm') {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-box">
          <p>${escapeHTMLComment(message)}</p>
          <div class="confirm-actions">
            <button type="button" id="confirmCancelBtn">Cancel</button>
            <button type="button" class="confirm-danger" id="confirmOkBtn">${escapeHTMLComment(confirmLabel)}</button>
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

  function showCommentEditForm(itemId) {
    const row = document.querySelector(`.comment-row[data-comment="${itemId}"]`);
    const { item, ref, parent } = findCommentAndRef(itemId);
    if (!row || !item || !ref) return;
    if (!canModifyComment(item, Auth.user)) return; // window expired since render

    const isReply = !!parent;
    row.outerHTML = commentEditFormHTML(item, isReply);
    const newRow = document.querySelector(`.comment-row[data-comment="${itemId}"]`);
    const form = $('#editInput-' + itemId).closest('form');
    $('#editInput-' + itemId).focus();

    $(`[data-edit-cancel="${itemId}"]`, newRow).addEventListener('click', () => {
      newRow.outerHTML = commentRowHTML(item, Auth.user, isReply);
      wireCommentRowInteractions(document.querySelector(`.comment-row[data-comment="${itemId}"]`));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const textarea = $('#editInput-' + itemId);
      const text = textarea.value.trim();
      if (!text) return;
      const fb = window.jbFirebase;
      const saveBtn = form.querySelector('.comment-edit-save');
      saveBtn.disabled = true;
      try {
        await ref.update({ text, editedAt: fb.firebase.firestore.FieldValue.serverTimestamp() });
        item.text = text;
        item.editedAt = { toDate: () => new Date() };
        const currentRow = document.querySelector(`.comment-row[data-comment="${itemId}"]`);
        currentRow.outerHTML = commentRowHTML(item, Auth.user, isReply);
        wireCommentRowInteractions(document.querySelector(`.comment-row[data-comment="${itemId}"]`));
      } catch (err) {
        toast('Could not save changes: ' + (err.message || err), true);
        saveBtn.disabled = false;
      }
    });
  }

  async function deleteCommentOrReply(itemId) {
    const { item, ref, parent } = findCommentAndRef(itemId);
    if (!item || !ref) return;
    if (!canModifyComment(item, Auth.user)) return; // window expired since render

    const ok = await customConfirm(
      parent ? 'Delete this reply? This cannot be undone.' : 'Delete this comment? This will also remove its replies and cannot be undone.',
      'Delete'
    );
    if (!ok) return;

    try {
      if (!parent) {
        // Deleting a top-level comment doesn't need to also delete its
        // replies subcollection: replies are only ever loaded by first
        // reading the parent comment out of the top-level "comments" query,
        // so once the parent is gone its replies simply become unreachable
        // (they may still exist in Firestore, but no reader will ever see
        // them again — and a reply's own author retains the option to
        // delete it directly within their own 1-day window).
        await ref.delete();
        CommentsState.comments = CommentsState.comments.filter(c => c.id !== itemId);
        const threadEl = document.querySelector(`.comment-thread[data-thread="${itemId}"]`);
        if (threadEl) threadEl.remove();
        if (!CommentsState.comments.length) {
          const listEl = $('#chapterCommentList');
          if (listEl) listEl.innerHTML = `<p class="comment-empty">No comments yet — be the first to share your thoughts.</p>`;
        }
      } else {
        await ref.delete();
        parent.replies = (parent.replies || []).filter(r => r.id !== itemId);
        const container = $('#replies-' + parent.id);
        if (container) {
          container.outerHTML = repliesBlockHTML(parent, Auth.user);
          wireCommentRowInteractions($('#replies-' + parent.id));
        }
      }
      toast('Deleted.');
    } catch (err) {
      toast('Could not delete: ' + (err.message || err), true);
    }
  }

  function findCommentAndRef(itemId) {
    const fb = window.jbFirebase;
    for (const c of CommentsState.comments) {
      if (c.id === itemId) return { item: c, ref: fb.db.collection('comments').doc(c.id), parent: null };
      const reply = (c.replies || []).find(r => r.id === itemId);
      if (reply) return { item: reply, ref: fb.db.collection('comments').doc(c.id).collection('replies').doc(reply.id), parent: c };
    }
    return {};
  }

  async function toggleLike(itemId, btnEl) {
    if (!requireLogin('Sign in to like comments.')) return;
    const fb = window.jbFirebase;
    const user = Auth.user;
    const { item, ref } = findCommentAndRef(itemId);
    if (!item || !ref) return;

    const likedBy = Array.isArray(item.likedBy) ? item.likedBy : (item.likedBy = []);
    const alreadyLiked = likedBy.includes(user.uid);

    // Optimistic local update + instant DOM patch — no re-fetch, no flash.
    if (alreadyLiked) {
      item.likedBy = likedBy.filter(id => id !== user.uid);
    } else {
      item.likedBy = [...likedBy, user.uid];
    }
    btnEl.classList.toggle('liked', !alreadyLiked);
    btnEl.querySelector('.ig-like-count').textContent = item.likedBy.length || '';

    try {
      await ref.update({
        likedBy: alreadyLiked
          ? fb.firebase.firestore.FieldValue.arrayRemove(user.uid)
          : fb.firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
    } catch (err) {
      // Roll back on failure.
      item.likedBy = likedBy;
      btnEl.classList.toggle('liked', alreadyLiked);
      btnEl.querySelector('.ig-like-count').textContent = likedBy.length || '';
      toast('Could not update like: ' + (err.message || err), true);
    }
  }

  function showReplyForm(commentId) {
    const container = $('#replies-' + commentId);
    if (!container || $('#replyForm-' + commentId)) return;
    const user = Auth.user;
    const formHTML = `
      <form class="reply-form" id="replyForm-${commentId}" data-reply-form="${commentId}">
        <textarea id="replyInput-${commentId}" maxlength="1000" placeholder="Write a reply..." required></textarea>
        ${quickEmojiBarHTML('replyInput-' + commentId)}
        <button type="submit">Reply</button>
      </form>`;
    container.insertAdjacentHTML('beforeend', formHTML);
    const form = $('#replyForm-' + commentId);
    wireQuickEmojiBar($('.quick-emoji-bar', form));
    $('#replyInput-' + commentId).focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const textarea = $('#replyInput-' + commentId);
      const text = textarea.value.trim();
      if (!text) return;
      const fb = window.jbFirebase;
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const docRef = await fb.db.collection('comments').doc(commentId).collection('replies').add({
          text,
          uid: user.uid,
          authorName: user.displayName || 'Reader',
          createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
          likedBy: []
        });
        const comment = CommentsState.comments.find(c => c.id === commentId);
        const newReply = { id: docRef.id, text, uid: user.uid, authorName: user.displayName || 'Reader', createdAt: { toDate: () => new Date() }, likedBy: [] };
        if (comment) {
          comment.replies = comment.replies || [];
          comment.replies.push(newReply);
        }
        form.remove();
        // Patch just this comment's replies block rather than the whole list.
        const container2 = $('#replies-' + commentId);
        if (container2 && comment) {
          container2.outerHTML = repliesBlockHTML(comment, Auth.user);
          wireCommentRowInteractions($('#replies-' + commentId));
        }
      } catch (err) {
        toast('Could not post reply: ' + (err.message || err), true);
      } finally {
        btn.disabled = false;
      }
    });
  }

  async function renderChapterComments(chapterId) {
    const wrap = $('#readerComments');
    if (!wrap) return;

    const user = Auth.user;
    const loginNoteHTML = user ? '' : `
      <div class="comment-login-note">
        <span>Sign in to join the conversation and like comments.</span>
        <button type="button" id="commentLoginBtn">Sign In</button>
      </div>`;
    const formHTML = user ? `
      <form class="comment-form" id="chapterCommentForm">
        <textarea id="chapterCommentInput" maxlength="2000" placeholder="Share your thoughts on this chapter..." required></textarea>
        ${quickEmojiBarHTML('chapterCommentInput')}
        <button type="submit">Post Comment</button>
      </form>` : '';

    wrap.innerHTML = `
      <h3>Comments</h3>
      ${loginNoteHTML}
      ${formHTML}
      <div class="comment-list" id="chapterCommentList"><p class="comment-empty">Loading comments…</p></div>
    `;

    if (!user) {
      $('#commentLoginBtn').addEventListener('click', () => $('#accountOverlay').classList.add('open'));
    } else {
      wireQuickEmojiBar($('.quick-emoji-bar', wrap));
      $('#chapterCommentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = $('#chapterCommentInput');
        const text = input.value.trim();
        if (!text) return;
        const fb = window.jbFirebase;
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        try {
          const docRef = await fb.db.collection('comments').add({
            chapterId,
            text,
            uid: user.uid,
            authorName: user.displayName || 'Reader',
            createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
            likedBy: []
          });
          const newComment = { id: docRef.id, chapterId, text, uid: user.uid, authorName: user.displayName || 'Reader', createdAt: { toDate: () => new Date() }, likedBy: [], replies: [] };
          CommentsState.comments.unshift(newComment);
          input.value = '';

          const listEl = $('#chapterCommentList');
          if (listEl.querySelector('.comment-empty')) listEl.innerHTML = '';
          const threadHTML = `<div class="comment-thread" data-thread="${newComment.id}">${commentRowHTML(newComment, user, false)}${repliesBlockHTML(newComment, user)}</div>`;
          listEl.insertAdjacentHTML('afterbegin', threadHTML);
          wireCommentRowInteractions(listEl.querySelector(`[data-thread="${newComment.id}"]`));
        } catch (err) {
          toast('Could not post comment: ' + (err.message || err), true);
        } finally {
          btn.disabled = false;
        }
      });
    }

    const comments = await fetchChapterComments(chapterId);
    CommentsState.chapterId = chapterId;
    CommentsState.comments = comments;

    const listEl = $('#chapterCommentList');
    if (!listEl) return; // reader may have been closed while this was loading
    if (!comments.length) {
      listEl.innerHTML = `<p class="comment-empty">No comments yet — be the first to share your thoughts.</p>`;
      return;
    }

    listEl.innerHTML = comments.map(c => `
      <div class="comment-thread" data-thread="${c.id}">
        ${commentRowHTML(c, user, false)}
        ${repliesBlockHTML(c, user)}
      </div>
    `).join('');

    wireCommentRowInteractions(listEl);
  }

  /* ---- Reviews & Ratings (site-wide overall-manga reviews — read by
     everyone, but only a signed-in reader may post one, and only ever
     their own single review, which they can update or delete later) ---- */
  const ReviewsState = { reviews: [], loaded: false };
  let reviewFormRating = 0;

  // A single 5-point star, filled or outlined — shared by the summary
  // score, the interactive picker in the form, and every review row.
  function starSVG(filled) {
    return `<svg class="star-icon ${filled ? 'filled' : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.6 7.2.6-5.5 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7-5.5-4.7 7.2-.6L12 2.5z"/></svg>`;
  }

  function starsHTML(rating, cls) {
    let html = '';
    for (let i = 1; i <= 5; i++) html += starSVG(i <= Math.round(rating));
    return `<span class="${cls}">${html}</span>`;
  }

  async function fetchReviews() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return [];
    try {
      const snap = await fb.db.collection('reviews').get();
      const reviews = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      reviews.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt));
      await preloadAuthorPhotos(reviews); // reuses the comments photo cache — reviews carry the same uid/authorName shape
      return reviews;
    } catch (err) {
      console.warn('Could not load reviews', err);
      return [];
    }
  }

  function renderReviewsSummary() {
    const el = $('#reviewsSummary');
    if (!el) return;
    const reviews = ReviewsState.reviews;
    if (!reviews.length) {
      el.innerHTML = `
        <div class="reviews-summary-score">—</div>
        <div class="reviews-summary-meta">
          ${starsHTML(0, 'reviews-summary-stars')}
          <span class="reviews-summary-count">No ratings yet</span>
        </div>`;
      return;
    }
    const avg = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;
    el.innerHTML = `
      <div class="reviews-summary-score">${avg.toFixed(1)}</div>
      <div class="reviews-summary-meta">
        ${starsHTML(avg, 'reviews-summary-stars')}
        <span class="reviews-summary-count">${reviews.length} rating${reviews.length === 1 ? '' : 's'}</span>
      </div>`;
  }

  function reviewRowHTML(r, user) {
    const when = r.createdAt && r.createdAt.toDate ? timeAgo(r.createdAt.toDate()) : 'now';
    const photo = r.uid ? AvatarPhotoCache.get(r.uid) : null;
    const isOwn = !!(user && r.uid === user.uid);
    return `
      <div class="review-row" data-review="${r.id}">
        <div class="review-avatar">${avatarInnerHTML(r.authorName, photo)}</div>
        <div class="review-body">
          <div class="review-line">
            <span class="review-author">${escapeHTMLComment(r.authorName || 'Reader')}</span>
            ${starsHTML(r.rating || 0, 'review-stars')}
            <span class="review-time">${when}</span>
            ${r.editedAt ? '<span class="review-edited-tag">(edited)</span>' : ''}
            ${isOwn ? '<span class="review-own-tag">You</span>' : ''}
          </div>
          ${r.text ? `<div class="review-text">${escapeHTMLComment(r.text)}</div>` : ''}
        </div>
      </div>`;
  }

  function renderReviewsList() {
    const listEl = $('#reviewsList');
    if (!listEl) return;
    const reviews = ReviewsState.reviews;
    if (!reviews.length) {
      listEl.innerHTML = `<p class="review-empty">No reviews yet — be the first to rate Journey Begin's manga.</p>`;
      return;
    }
    listEl.innerHTML = reviews.map(r => reviewRowHTML(r, Auth.user)).join('');
  }

  function starPickerHTML(selected) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<button type="button" data-star="${i}" aria-label="${i} star${i > 1 ? 's' : ''}">${starSVG(i <= selected)}</button>`;
    }
    return `<div class="star-picker" id="reviewStarPicker">${html}</div>`;
  }

  function wireStarPicker(container) {
    const picker = $('#reviewStarPicker', container);
    if (!picker) return;
    $$('button[data-star]', picker).forEach(btn => {
      btn.addEventListener('click', () => {
        reviewFormRating = parseInt(btn.dataset.star, 10);
        $$('button[data-star]', picker).forEach(b => {
          b.innerHTML = starSVG(parseInt(b.dataset.star, 10) <= reviewFormRating);
        });
      });
    });
  }

  // Renders the sign-in prompt (logged out) or the rate/review form
  // (logged in) — pre-filled with the reader's own existing review, if any,
  // since a reader may only ever have one review on file.
  function renderReviewForm() {
    const wrap = $('#reviewFormWrap');
    if (!wrap) return;
    const user = Auth.user;

    if (!user) {
      wrap.innerHTML = `
        <div class="review-login-note">
          <span>Sign in to rate and review Journey Begin's manga.</span>
          <button type="button" id="reviewLoginBtn">Sign In</button>
        </div>`;
      $('#reviewLoginBtn').addEventListener('click', () => $('#accountOverlay').classList.add('open'));
      return;
    }

    const existing = ReviewsState.reviews.find(r => r.uid === user.uid);
    reviewFormRating = existing ? (existing.rating || 0) : 0;

    wrap.innerHTML = `
      <form class="review-form" id="reviewForm">
        <span class="review-form-label">${existing ? 'Update your review' : 'Rate & review Journey Begin'}</span>
        ${starPickerHTML(reviewFormRating)}
        <textarea id="reviewTextInput" maxlength="1000" placeholder="What did you think of the manga overall? (optional)">${existing ? escapeHTMLComment(existing.text || '') : ''}</textarea>
        <div class="review-form-actions">
          <button type="submit" class="review-submit-btn">${existing ? 'Update Review' : 'Post Review'}</button>
          ${existing ? '<button type="button" class="review-delete-btn" id="reviewDeleteBtn">Delete</button>' : ''}
        </div>
      </form>`;

    wireStarPicker(wrap);

    $('#reviewForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!reviewFormRating) { toast('Please pick a star rating.', true); return; }
      const fb = window.jbFirebase;
      if (!fb || !fb.db) { toast('Reviews are unavailable right now.', true); return; }
      const text = $('#reviewTextInput').value.trim();
      const btn = e.target.querySelector('.review-submit-btn');
      btn.disabled = true;
      try {
        const payload = {
          uid: user.uid,
          authorName: user.displayName || user.email || 'Reader',
          rating: reviewFormRating,
          text,
          createdAt: existing ? existing.createdAt : fb.firebase.firestore.FieldValue.serverTimestamp()
        };
        if (existing) payload.editedAt = fb.firebase.firestore.FieldValue.serverTimestamp();
        await fb.db.collection('reviews').doc(user.uid).set(payload, { merge: true });
        toast(existing ? 'Review updated.' : 'Thanks for your review!');
        await reloadReviews();
      } catch (err) {
        toast('Could not save review: ' + (err.message || err), true);
      } finally {
        btn.disabled = false;
      }
    });

    if (existing) {
      $('#reviewDeleteBtn').addEventListener('click', async () => {
        const ok = await customConfirm('Delete your review? This cannot be undone.', 'Delete');
        if (!ok) return;
        try {
          await window.jbFirebase.db.collection('reviews').doc(user.uid).delete();
          toast('Review deleted.');
          await reloadReviews();
        } catch (err) {
          toast('Could not delete review: ' + (err.message || err), true);
        }
      });
    }
  }

  async function reloadReviews() {
    ReviewsState.reviews = await fetchReviews();
    ReviewsState.loaded = true;
    renderReviewsSummary();
    renderReviewForm();
    renderReviewsList();
  }

  // Lazy-loaded (see initLazySections) so reviews are only fetched once the
  // section actually scrolls near the viewport.
  async function loadReviewsSection() {
    renderReviewForm(); // sign-in note / form appears immediately, no need to wait on the fetch
    await reloadReviews();
  }

  /* =====================================================================
     14. EVENT WIRING (search, bookmarks, reader controls, lightbox, modal)
  ===================================================================== */
  function initOverlaysAndControls() {
    // search
    $('#searchToggle').addEventListener('click', openSearch);
    $('#searchClose').addEventListener('click', closeSearch);
    $('#searchOverlay').addEventListener('click', (e) => { if (e.target.id === 'searchOverlay') closeSearch(); });
    $('#searchInput').addEventListener('input', (e) => runSearch(e.target.value));

    // bookmarks panel
    $('#bookmarkToggle').addEventListener('click', () => $('#bookmarkOverlay').classList.add('open'));
    $('#bookmarkClose').addEventListener('click', () => $('#bookmarkOverlay').classList.remove('open'));
    $('#bookmarkOverlay').addEventListener('click', (e) => { if (e.target.id === 'bookmarkOverlay') $('#bookmarkOverlay').classList.remove('open'); });

    // account panel (reader sign in / register / profile)
    $('#accountToggle').addEventListener('click', () => $('#accountOverlay').classList.add('open'));
    $('#accountClose').addEventListener('click', () => $('#accountOverlay').classList.remove('open'));
    $('#accountOverlay').addEventListener('click', (e) => { if (e.target.id === 'accountOverlay') $('#accountOverlay').classList.remove('open'); });
    initAccountForms();

    // reader
    $('#readerClose').addEventListener('click', closeReader);
    $('#zoomIn').addEventListener('click', () => { ReaderState.zoom = Math.min(200, ReaderState.zoom + 10); updateZoomUI(); });
    $('#zoomOut').addEventListener('click', () => { ReaderState.zoom = Math.max(50, ReaderState.zoom - 10); updateZoomUI(); });
    $('#fullscreenBtn').addEventListener('click', toggleReaderFullscreen);
    $('#readerFsExit').addEventListener('click', exitReaderFullscreen);
    $('#readerPages').addEventListener('scroll', updateReaderProgress, { passive: true });

    // lightbox
    $('#lightboxClose').addEventListener('click', closeLightbox);
    $('#lightboxPrev').addEventListener('click', () => lightboxStep(-1));
    $('#lightboxNext').addEventListener('click', () => lightboxStep(1));
    $('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

    // character modal
    $('#charModalClose').addEventListener('click', closeCharacterModal);
    $('#charModalOverlay').addEventListener('click', (e) => { if (e.target.id === 'charModalOverlay') closeCharacterModal(); });

    // arc page
    $('#arcPageClose').addEventListener('click', closeArcPage);

    // global escape key
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') {
        if (e.key === 'ArrowRight' && $('#lightbox').classList.contains('open')) lightboxStep(1);
        if (e.key === 'ArrowLeft' && $('#lightbox').classList.contains('open')) lightboxStep(-1);
        return;
      }
      if ($('#lightbox').classList.contains('open')) return closeLightbox();
      if ($('#charModalOverlay').classList.contains('open')) return closeCharacterModal();
      if ($('#searchOverlay').classList.contains('open')) return closeSearch();
      if ($('#bookmarkOverlay').classList.contains('open')) return $('#bookmarkOverlay').classList.remove('open');
      if ($('#accountOverlay').classList.contains('open')) return $('#accountOverlay').classList.remove('open');
      if ($('#reader').classList.contains('open')) return closeReader();
      if ($('#arcPage').classList.contains('open')) return closeArcPage();
      closeMobileMenu();
    });
  }

  /* =====================================================================
     15. INIT
  ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Upgrade the built-in placeholder content with whatever was last
    // successfully fetched from Firestore this session, if anything —
    // avoids the "old content flashes then swaps to live" effect on reload.
    loadCachedData();

    // Render immediately (with cached-live or fallback content) so the page
    // is never blank while waiting on the network — then swap in the latest
    // content from Firestore the moment it arrives.
    renderMangaGrid();
    renderChapterList();
    renderWorldMap();
    renderCharacters();
    renderLore();
    renderGallery();
    renderNews();
    renderSocialLinks();
    wireHeroReadButton();

    SEARCH_INDEX = buildSearchIndex();

    initNav();
    initHamburger();
    initReveals();
    initOverlaysAndControls();
    updateBookmarkCount();
    renderBookmarkPanel();
    initLazySections();

    loadRemoteData().then(() => {
      renderMangaGrid();
      renderChapterList();
      renderLore();
      renderNews();
      renderSocialLinks();
      wireHeroReadButton();
      SEARCH_INDEX = buildSearchIndex();
    });
  });

})();
