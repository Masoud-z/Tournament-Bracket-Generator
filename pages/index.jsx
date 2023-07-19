import Head from "next/head";
import LandingPage from "@/components/landingPage/LandingPage";


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
        <link rel="icon" href="/Tournament.png" />
      </Head>
      <LandingPage />
    </>
  );
}
