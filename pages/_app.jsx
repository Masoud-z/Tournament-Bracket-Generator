import { useState } from "react";
import { Dark } from "@/helper/Contexts";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  return;
  <Dark.Provider value={{ darkMode, setDarkMode }}>
    <Component {...pageProps} />
  </Dark.Provider>;
}
