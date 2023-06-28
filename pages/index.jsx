import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tournament Bracket Generator</title>
        <meta
          name="description"
          content="Tournament Bracket Generator for task Chanllenge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/globe.png" />
      </Head>
    </>
  );
}
