import { useContext, useEffect, useState } from "react";

import Link from "next/link";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import styles from "./Tournment.module.css";
import { Msg, logStatus, Dark } from "@/helper/Contexts";
import { db } from "@/config/firebase";

export default function Tournment({ tournmentId }) {
  const [tournment, setTournment] = useState();
  useEffect(() => {
    const gameRef = doc(db, "games", tournmentId);
    getDoc(gameRef)
      .then((tournment) => {
        setTournment({ ...tournment.data(), id: tournment.id });
      })
      .catch((err) => {
        setMsg({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  }, []);
  console.log(tournment);
  return <></>;
}
