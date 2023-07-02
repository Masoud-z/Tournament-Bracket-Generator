import { useContext } from "react";
import Link from "next/link";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Dark } from "@/helper/Contexts";
import styles from "./LayouutStyle.module.css";

export default function Layout(props) {
  const { darkMode, setDarkMode } = useContext(Dark);
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

        <nav className={styles.linksContainer}>
          <Link className={styles.navLink} href="/new">
            Create new Tournament
          </Link>
          <Link className={styles.navLink} href="/list">
            Tournaments List
          </Link>
        </nav>

        <div
          className={styles.darkMode}
          onClick={() => setDarkMode((perv) => !perv)}
        >
          {darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
          <p>Dark Mode</p>
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
}
