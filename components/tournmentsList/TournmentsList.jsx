import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { collection, getDocs } from "firebase/firestore";

import styles from "./TournmentsList.module.css";
import { Msg, logStatus, Dark } from "@/helper/Contexts";
import { auth, db } from "@/config/firebase";

export default function TournmentsList() {
  const gamesRef = collection(db, "games");
  const route = useRouter();

  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);
  const { darkMode } = useContext(Dark);

  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    //Check If user logged in
    if (!loggedIn) {
      //Redirect to landing page
      route.back();
    } else {
      getDocs(collection(db, "games"))
        .then((data) => {
          const list = data.docs.filter(
            (doc) => doc.data().userId == auth.currentUser.uid
          );

          const dataList = list.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          dataList.sort((a, b) => a.creted_at - b.created_at);
          setGamesList(dataList);
        })
        .catch((err) =>
          setMsg({
            open: true,
            message: err.message,
            type: "error",
          })
        );
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
      <div className={styles.gamesList}>
        {gamesList.map((game) => (
          <Link
            key={game.id}
            href={`/tournment/${game.id}`}
            className={styles.game}
          >
            {game.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
