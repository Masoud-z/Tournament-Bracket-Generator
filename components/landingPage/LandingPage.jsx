import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./LandingPageStyle.module.css";
import { logStatus } from "@/helper/Contexts";

export default function LandingPage() {
  const { loggedIn } = useContext(logStatus);
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Generate Brackets
          <br />
          for All your Tournaments
        </h1>
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
      </div>
      <Image src="/Tournament.png" alt="Tournament" width="300" height="300" />
    </div>
  );
}
