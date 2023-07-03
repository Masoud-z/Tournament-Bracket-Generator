import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { collection, addDoc } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./TournmentsList.module.css";
import { Msg, logStatus, Dark } from "@/helper/Contexts";
import { auth, db } from "@/config/firebase";

export default function TournmentsList() {
  const games = collection(db, "games");
  const route = useRouter();

  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);
  const { darkMode } = useContext(Dark);

  const [game, setGame] = useState({
    name: "",
    levels: null,
    players: [],
    groups: null,
    playersCount: null,
  });

  useEffect(() => {
    //Check If user logged in
    if (!loggedIn) {
      //Redirect to landing page
      route.back();
    } else {
    }
  }, [loggedIn]);
  return (
    <div className={`container ${darkMode ? "darkShadow" : "lightShadow"}`}>
      <div className="header">
        <h1>Tournments List</h1>
        <div onClick={route.back} className="backBtn">
          Back
        </div>
      </div>
    </div>
  );
}
