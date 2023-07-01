import Image from "next/image";
import styles from "./LandingPageStyle.module.css";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Generate Brackets
          <br />
          for All your Tournaments
        </h1>
        <div className={styles.btnContainer}>
          <Link href="/signup" className={styles.btn}>
            Sign Up
          </Link>
          <Link href="/signin" className={styles.btn}>
            Sign In
          </Link>
        </div>
      </div>
      <Image src="/Tournament.png" alt="globe" width="300" height="300" />
    </div>
  );
}
