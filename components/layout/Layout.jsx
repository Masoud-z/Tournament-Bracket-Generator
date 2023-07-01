import { useContext } from "react";
import Link from "next/link";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";
import { Dark } from "@/helper/Contexts";

export default function Layout(props) {
  const { darkMode, setDarkMode } = useContext(Dark);
  return (
    <>
      <header className={darkMode ? "dark" : "light"}>
        <div className="logo">Tournament Bracket Generator</div>
        <nav>
          <Link href="/new">Create new Tournament</Link>
          <Link href="/list">Tournaments List</Link>
        </nav>
        <div onClick={() => setDarkMode((perv) => !perv)}>
          {darkMode ? <BsFillMoonFill /> : <BsMoon />}
          <p>Dark Mode</p>
        </div>
      </header>
      <main>{props.children}</main>
    </>
  );
}
