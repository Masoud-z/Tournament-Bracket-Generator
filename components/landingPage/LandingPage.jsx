import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./LandingPageStyle.module.css";
import { logStatus } from "@/helper/Contexts";

export default function LandingPage() {
  const { loggedIn } = useContext(logStatus);

  return (
    <div className={styles.container}>
      <h1>Generate Brackets</h1>
      <Image src="/Tournament.png" alt="Tournament" width="200" height="200" />
      <div>
        <h1>for All your Tournaments</h1>
        {!loggedIn && (
          <div className={styles.btnContainer}>
            <Link href="/signup" className={styles.btn}>
              Sign Up
            </Link>
            <Link href="/signin" className={styles.btn}>
              Sign In
            </Link>
          </div>
        )}

        {loggedIn && (
          <div className={`${styles.btnContainer} ${styles.navigation}`}>
            <Link className={styles.btn} href="/new">
              Create new Tournament
            </Link>
            <Link className={styles.btn} href="/list">
              Tournaments List
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
