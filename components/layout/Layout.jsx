import Link from "next/link";
import React from "react";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";

export default function Layout() {
  return (
    <>
      <header>
        <div>Tournament Bracket Generator</div>
        <nav>
          <Link href="/new">Create new Tournament</Link>
          <Link href="/list">Tournaments List</Link>
        </nav>
        <div>
          {darkMode ? <BsFillMoonFill /> : <BsMoon />}
          <p>Dark Mode</p>
        </div>
      </header>
    </>
  );
}
