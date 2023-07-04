import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { Alert, Slide, Snackbar } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { Dark, Msg, logStatus } from "@/helper/Contexts";
import styles from "./LayouutStyle.module.css";
import { auth } from "@/config/firebase";

export default function Layout(props) {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useContext(logStatus);
  const { darkMode, setDarkMode } = useContext(Dark);
  const { msg, setMsg } = useContext(Msg);
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        router.push("./");
        setMsg({
          open: true,
          message: "You successfully signed out",
          type: "success",
        });
      })
      .catch((err) => {
        setMsg({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <header
        className={`${styles.header} ${
          darkMode ? styles.darkHeader : styles.lightHeader
        } `}
      >
        <Link href="/" className={styles.logo}>
          Tournament Bracket Generator
        </Link>

        {loggedIn && (
          <nav className={styles.linksContainer}>
            <Link className={styles.navLink} href="/new">
              Create new Tournament
            </Link>
            <Link className={styles.navLink} href="/list">
              Tournaments List
            </Link>
          </nav>
        )}

        <div className={styles.linksContainer}>
          {loggedIn && (
            <span className={styles.signOut} onClick={logOut}>
              Sign Out
            </span>
          )}
          <div
            className={styles.darkMode}
            onClick={() => setDarkMode((perv) => !perv)}
          >
            {darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
          </div>
        </div>
      </header>
      <main>{props.children}</main>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        open={msg.open}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setMsg({ open: false, message: "", type: "" });
          }
        }}
        key="left"
      >
        <Alert variant="filled" severity={msg.type} sx={{ width: "100%" }}>
          {msg.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
