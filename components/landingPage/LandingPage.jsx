import Image from "next/image";
import styles from "./LandingPageStyle.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1>
        Generate Brackets
        <br />
        for All your Tournaments
      </h1>
      <Image src="/Tournament.png" alt="globe" width="300" height="300" />
    </div>
  );
}
