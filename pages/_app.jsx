import { useState } from "react";
import { Dark, Msg } from "@/helper/Contexts";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  const [msg, setMsg] = useState({ open: false, message: "", type: "" });
  return (
    <Msg.Provider value={{ msg, setMsg }}>
      <Dark.Provider value={{ darkMode, setDarkMode }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Dark.Provider>
    </Msg.Provider>
  );
}
