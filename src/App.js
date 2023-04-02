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
// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
    console.log("user Changed:", currentUser.uid);
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
