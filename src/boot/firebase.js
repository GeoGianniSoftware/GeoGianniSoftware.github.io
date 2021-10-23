// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDLAUQgoGrWn0ZOdOb3ka2Ytjld__tTUbM",

  authDomain: "fapia-live.firebaseapp.com",

  projectId: "fapia-live",

  storageBucket: "fapia-live.appspot.com",

  messagingSenderId: "905785442598",

  appId: "1:905785442598:web:d235c642ab33c2259241e7",

  measurementId: "G-7Y729HV63J"

});

const db = getFirestore();


export default db;

