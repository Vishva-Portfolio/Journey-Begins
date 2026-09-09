/* =====================================================================
   JOURNEY BEGIN — FIREBASE CONFIG
   Shared by index.html (public site) and admin/index.html (admin panel).
   Loaded AFTER the firebase-*-compat.js SDK scripts, BEFORE script.js
   or admin.js.
   ===================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyASYIdYTGDReWGyblztBKI3uliL5ax-RQs",
  authDomain: "explore-tales.firebaseapp.com",
  projectId: "explore-tales",
  storageBucket: "explore-tales.firebasestorage.app",
  messagingSenderId: "699722213744",
  appId: "1:699722213744:web:03e24eb05e81780da847b5",
  measurementId: "G-DWLQS3TQ3L"
};

// Guard against double-initialization if this file is ever included twice.
if (typeof firebase !== 'undefined' && (!firebase.apps || !firebase.apps.length)) {
  firebase.initializeApp(firebaseConfig);
}

// Expose everything the site/admin needs under one namespace so plain
// <script> files (script.js / admin.js) — which are NOT ES modules —
// can use Firebase without any bundler.
if (typeof firebase !== 'undefined') {
  window.jbFirebase = {
    firebase,
    auth: firebase.auth(),
    db: firebase.firestore()
    // Storage is intentionally not initialized — all images are stored
    // directly in Firestore as compressed data URLs (see admin/admin.js),
    // so the site works fully on Firebase's free Spark plan.
  };

  // Analytics only works over https/http (not file://), so guard it.
  try {
    if (firebase.analytics && location.protocol.startsWith('http')) {
      firebase.analytics();
    }
  } catch (e) { /* analytics is optional — ignore failures */ }
}
