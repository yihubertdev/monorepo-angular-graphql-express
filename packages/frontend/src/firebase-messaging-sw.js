importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyCG-t3p5jbccULpo6-Nxxld4ZFaTvbDZK4",
  authDomain: "hubert-blog.firebaseapp.com",
  projectId: "hubert-blog",
  storageBucket: "hubert-blog.appspot.com",
  messagingSenderId: "484657131599",
  appId: "1:484657131599:web:82750e53ee7ad7f8543a3a",
  measurementId: "G-2J084T5NZ9",
  vapidKey:
    "BPINmuN1OJHrC_zXF6oxvGakPyP5aTKq4BndOimbHbTaL0vmCv0l31eh6uu1lKp4zgI_He6uPgAN_9D0xEkys5M",
});
const messaging = firebase.messaging();