// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXs17AC0l1nzKFL1Pazp3-lNqZKmqvx1o",
  authDomain: "awesomeproject-7a5fb.firebaseapp.com",
  projectId: "awesomeproject-7a5fb",
  storageBucket: "awesomeproject-7a5fb.firebasestorage.app",
  messagingSenderId: "976006201278",
  appId: "1:976006201278:web:c712d26187acf7f81483ef",
  measurementId: "G-MD9MT4T80K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);