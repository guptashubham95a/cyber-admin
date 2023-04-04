// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { auth } from "./firebase";
import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// ----------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAmeo_rCshC3CHNOJf6SAv4I_DiZ22kDV4",
  authDomain: "cyber-admin.firebaseapp.com",
  projectId: "cyber-admin",
  storageBucket: "cyber-admin.appspot.com",
  messagingSenderId: "6020811977",
  appId: "1:6020811977:web:25102c760b19fa8ce89118",
  measurementId: "G-NLKZCX3PHT",
};

firebase.initializeApp(firebaseConfig);
export default function App() {
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);

    console.log("user Changed:", currentUser.uid);

    firebase
      .firestore()
      .collection("authorities")
      .where("userid", "==", String(currentUser.uid))
      .get()
      .then((querySnapshot) => {
        // Data retrieved successfully
        console.log(querySnapshot, "quersnaoshot");
        querySnapshot.forEach((doc) => {
          console.log(doc, "doc");
          localStorage.setItem("tip_admin", doc.data().location);

          localStorage.setItem("tip_admin_name", doc.data().name);
          console.log(doc.data().location);
        });
      })
      .catch((error) => {
        // Handle data retrieval errors
        console.error(error);
      });
  });
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <ReactNotifications />
      <Router user={user} />
    </ThemeProvider>
  );
}
