import { useState } from "react";
import { Dark } from "@/helper/Contexts";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Dark.Provider value={{ darkMode, setDarkMode }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Dark.Provider>
  );
}
