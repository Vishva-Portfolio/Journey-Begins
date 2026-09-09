# Journey Begin — Admin Panel Setup

Your site now has a real admin system backed by Firebase. Visiting **`/admin`**
opens a login screen; once signed in, you get a dashboard to manage every
piece of content shown on the homepage (Manga, Chapters, Characters, World
Locations, Lore, Gallery, News) — no more editing `script.js` by hand.

## How it fits together

- **`firebase-config.js`** — your Firebase project config (already filled in
  with the keys you gave me). Loaded by both `index.html` and `admin/index.html`.
- **`index.html` / `script.js`** — the public site. On load it now tries to
  fetch content from Firestore; if a collection is empty or Firebase can't be
  reached, it silently falls back to the built-in sample content, so the site
  never breaks.
- **`admin/index.html` + `admin/admin.js`** — the admin dashboard: login,
  authorization check, and full CRUD (create/edit/delete) for every
  collection.
- **`firestore.rules`** — public read access for site content, write access
  restricted to authorized admins only (this is the only rules file needed —
  there's no Firebase Storage involved).

## One-time setup in the Firebase Console

1. **Enable Authentication**
   Firebase Console → your `explore-tales` project → *Build → Authentication →
   Sign-in method* → enable **Email/Password**.

2. **Create your admin account**
   Still in *Authentication → Users* → **Add user** → enter the email/password
   you want to log in to `/admin` with. Copy the **User UID** shown after
   creating it.

3. **Create the Firestore database**
   *Build → Firestore Database → Create database* (production mode is fine —
   you'll paste the provided rules next). Pick any region.

4. **Authorize your account as an admin**
   In Firestore, create a collection named `admins`. Add one document whose
   **Document ID is the User UID** you copied in step 2 (the fields inside
   don't matter — e.g. `{ email: "you@example.com" }`). This is what the
   security rules and the admin panel check before granting access.

5. **Publish the security rules**
   *Firestore Database → Rules* → paste the contents of `firestore.rules` →
   Publish. That's the only rules file needed — this project stores all
   images directly in Firestore (see below), so **Firebase Storage / the
   Blaze plan is not required**. Everything works on the free Spark plan.

6. **(Optional) Import the starter content**
   Log in to `/admin`, open any section (e.g. Manga), and click
   **"Import starter content"** — this copies the sample data the site
   shipped with into Firestore as a starting point you can then edit, instead
   of typing everything from scratch.

## How images are stored

Every image field in the admin panel — Manga cover, Character portrait,
Gallery image, and Chapter Pages — works the same way: when you choose a
file, it's resized and compressed **in your browser** (max ~1600px, JPEG
~80% quality) and saved as a compressed data string directly in Firestore.
No Firebase Storage, no billing, no external image host required. You can
also paste an existing image URL into any of these fields instead, if you'd
rather host images elsewhere.

**Chapter Pages are a bit special**: because a chapter can have many pages,
each page is saved as its **own small Firestore document** (in a
subcollection under that chapter) rather than packed into one document —
this keeps every chapter safely under Firestore's 1MB-per-document limit no
matter how many pages it has.

## Using the admin panel

- Go to `yoursite.com/admin` → sign in with the email/password from step 2.
- Pick a section from the left sidebar (Manga, Chapters, Characters, etc).
- **Add New** opens a form; **Edit** loads an entry back into the form;
  **Delete** removes it (with a confirmation).
- **Chapters** also get a **Download PDF** button — it pulls that chapter's
  uploaded pages back out in order and bundles them into a single PDF you
  can save to your computer.
- **Arcs**: give a chapter an **Arc Name** (e.g. "Arc 1 — Tale of Crystals")
  and every chapter that shares that same name, under the same manga, is
  collapsed into a single **arc card** on the homepage's "Latest Chapters"
  grid — showing the arc name, its manga, and how many of its chapters are
  unlocked, with a **Read Arc** button. Tapping it opens a dedicated arc
  page listing every chapter inside that arc, each with its own Read
  Chapter button. Leave Arc Name blank and the chapter just shows as its
  own standalone card in the same grid, as before.
- **Scheduled unlocks**: set a chapter's **Status** to `Upcoming` and an
  **Unlocks At** date/time (picked in your own local time, stored so it
  means the same instant for every visitor worldwide). Until that moment,
  the homepage shows it as **Locked** with a live countdown that updates
  every second — e.g. `23h 59m 1s left`. Once a full day or more remains,
  it collapses to a plain day count instead (e.g. `2 days left`) rather
  than ticking hours/minutes/seconds. The instant the countdown hits zero,
  the chapter unlocks itself automatically on every visitor's screen — no
  need to come back and flip its status to `Available` by hand (though you
  can still do that any time, e.g. to unlock it early).
- For **Manga**, **Characters**, and **Lore**, you set
  the Document ID yourself (a lowercase-dash slug, e.g. `eternity-of-crystal`)
  — this is the ID other content refers to. For example, when adding a
  **Chapter**, the "Manga id" field must match a Manga's slug exactly.
- **Chapters**, **Gallery**, and **News** entries get an auto-generated ID —
  you don't need to set one.
- Image fields let you either choose a file (compressed automatically and
  stored in Firestore, no billing needed) or paste an existing image URL.
- **Chapter pages**: the Chapters form has a "Chapter Pages" field where you
  select multiple images at once, in reading order — each is compressed and
  saved as its own small Firestore document, and the page count on the site
  updates automatically. Use the ↑ / ↓ buttons to reorder pages or ✕ to
  remove one, before saving. You can also paste image URLs one per line
  instead, if you'd rather host pages elsewhere.
- **World Map**: this section has no entries to manage — just upload one
  image (or paste a URL). It's the only thing shown in "Explore the World"
  on the main site, and clicking it there opens the full image.
- Changes are live in Firestore immediately; the public site picks them up
  the next time someone loads or refreshes the page.

## Deploying

If you deploy with the Firebase CLI, `/admin` works automatically because the
`admin/` folder contains its own `index.html` — most static hosts (Firebase
Hosting, Netlify, GitHub Pages, Apache, etc.) will serve that file for
`/admin` or `/admin/` without any extra configuration. `firebase.json` also
includes an explicit rewrite for Firebase Hosting just in case.

```
npm install -g firebase-tools   # if you don't have it
firebase login
firebase deploy
```

## Security notes

- Only accounts with a matching document in the `admins` Firestore collection
  can write content — everyone else can only read (which is what the public
  site needs).
- Add more admins later by creating additional `admins/{uid}` documents for
  their accounts, in the same way as step 4 above.
- Never commit real production credentials to a public repo if you fork or
  share this project — Firebase web API keys are not secret by design (they
  identify your project, not authenticate requests), but your Firestore
  rules are what actually protect your data, so make sure they're published
  as described above.
