// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmeo_rCshC3CHNOJf6SAv4I_DiZ22kDV4",
  authDomain: "cyber-admin.firebaseapp.com",
  projectId: "cyber-admin",
  storageBucket: "cyber-admin.appspot.com",
  messagingSenderId: "6020811977",
  appId: "1:6020811977:web:25102c760b19fa8ce89118",
  measurementId: "G-NLKZCX3PHT",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// const analytics = getAnalytics(app);
export const auth = firebase.auth();
export default db;
