import { useContext, useEffect, useState } from "react";

import Link from "next/link";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import styles from "./Tournment.module.css";
import { Msg, logStatus, Dark } from "@/helper/Contexts";
import { db } from "@/config/firebase";
import { useForm } from "react-hook-form";

export default function Tournment({ tournmentId }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);
  const { darkMode } = useContext(Dark);

  const [tournment, setTournment] = useState();

  useEffect(() => {
    if (loggedIn) {
      //Get the deatail of Tournment from server
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
    } else {
      route.push("/");
    }
  }, []);

  //Set score of the current level to player
  const setScore = (value, playerId, level) => {
    setTournment((prev) => {
      const newPlayers = prev.players.map((player) => {
        const newPlayer = player;
        if (player.id == playerId) {
          newPlayer[`result${level}`] = value;
        }
        return newPlayer;
      });
    });
  };

  const getGroups = (level) => {
    const list = tournment.players.filter((player) => player.level <= level);
    const groups = [];
    for (let i = 1; i <= Math.ceil(list.length / 2); i++) {
      const groupPlayers = list.filter(
        (player) => player[`group${level}`] === i
      );
      groups.push(
        <div className={styles.group}>
          <h5>Group {i}</h5>
          {groupPlayers.map((player) => (
            <div className={styles.player}>
              <div>{player.playerName}</div>
              <input
                {...register(`player${player.id}`, { required: true })}
                className={`${styles.playerInput}  ${
                  darkMode ? styles.darkInput : styles.lightInput
                }`}
                style={{
                  backgroundColor: errors[`player${player.id}`] && "red",
                }}
                value={player[`result${level}`]}
                type="number"
                readonly={groupPlayers[0].level != groupPlayers[1].level}
                onChange={(e) => setScore(e.target.value, player.id, level)}
              />
            </div>
          ))}
        </div>
      );
    }

    return groups;
  };

  const rounds = [];
  if (tournment) {
    for (let i = 1; i <= tournment.levels; i++) {
      rounds.push(
        <div
          className={`${styles.round} ${
            darkMode ? "darkShadow" : "lightShadow"
          }`}
        >
          <h4 className={styles.roundTitle}>
            {i == tournment.levels - 1
              ? "Semi-Final"
              : i == tournment.levels
              ? "Final"
              : `Round ${i}`}
          </h4>
          {getGroups(i)}
        </div>
      );
    }
  }
  return (
    <div className={`container ${darkMode ? "darkShadow" : "lightShadow"}`}>
      {tournment && (
        <>
          <h1>{tournment.name}</h1>
          {tournment.finished && (
            <>
              <h2 className={styles.championTitle}>Champion: </h2>
              <div className={styles.championContainer}>
                <h3 className={styles.champion}>{tournment.winner} </h3>
              </div>
            </>
          )}

          <div
            className={styles.levels}
            style={{
              gridTemplateColumns: `repeat(${tournment.levels}, 1fr)`,
            }}
          >
            {rounds}
          </div>
        </>
      )}
    </div>
  );
}
