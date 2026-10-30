importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBQLtzJ8g1mGblFVzzV4NqlHMxOXsmP1x0",
  authDomain: "aledavisa-1e0b4.firebaseapp.com",
  projectId: "aledavisa-1e0b4",
  storageBucket: "aledavisa-1e0b4.firebasestorage.app",
  messagingSenderId: "124905728707",
  appId: "1:124905728707:web:68fc6e7f993bedf7131076",
  measurementId: "G-BMWKLZB9GD"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje en segundo plano recibido: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'favicon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
