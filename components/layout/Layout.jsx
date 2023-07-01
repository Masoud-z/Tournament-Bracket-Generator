import { useContext } from "react";
import Link from "next/link";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";
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
        <div className={styles.logo}>Tournament Bracket Generator</div>

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
          {darkMode ? <BsFillMoonFill /> : <BsMoon />}
          <p>Dark Mode</p>
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
}
