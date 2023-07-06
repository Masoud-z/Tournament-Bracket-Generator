import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

import { Backdrop, Button, CircularProgress } from "@mui/material";

import { Msg, logStatus, Dark } from "@/helper/Contexts";

import styles from "./Tournment.module.css";

export default function Tournment({ tournmentId }) {
  const route = useRouter();

  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);
  const { darkMode } = useContext(Dark);

  const [tournment, setTournment] = useState();
  const [loading, setLoading] = useState(true);
  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      //Get the deatail of Tournment from server
      const gameRef = doc(db, "games", tournmentId);
      getDoc(gameRef)
        .then((tournmentIns) => {
          setTournment({ ...tournmentIns.data(), id: tournmentIns.id });
          setLoading(false);
        })
        .catch((err) => {
          setMsg({
            open: true,
            message: err.message,
            type: "error",
          });
          setLoading(false);
          route.push("/");
        });
    } else {
      route.push("/");
    }
  }, []);

  //Set score of the current level to player
  const setScore = (value, playerId, level) => {
    setTournment((prev) => {
      const newTournment = prev;
      const newPlayers = newTournment.players.map((player) => {
        const newPlayer = player;
        if (player.id == playerId) {
          newPlayer[`result${level}`] = +value;
        }
        return newPlayer;
      });
      newTournment.players = newPlayers;
      return newTournment;
    });
  };

  //send players score to server
  const submitScore = (players) => {
    const level = players[0].level;
    //check if user added the result to players
    if (!players[0][`result${level}`] || !players[1][`result${level}`]) {
      setMsg({
        open: true,
        message: "Player's result  should not empty",
        type: "error",
      });
      // check if the results are not the same
    } else if (players[0][`result${level}`] === players[1][`result${level}`]) {
      setMsg({
        open: true,
        message: "Players' results  should not equal",
        type: "error",
      });
    } else {
      setOpenLoading(true);
      // get the refrence of the tournment from server
      const gameRef = doc(db, "games", tournment.id);
      const newTournment = tournment;
      // check if the play was final
      if (tournment.levels === level) {
        // set the tournment status to finished
        newTournment.finished = true;
        // Set the winner of tournment
        newTournment.winner =
          players[0][`result${level}`] > players[1][`result${level}`]
            ? players[0].playerName
            : players[1].playerName;
      } else if (players[0][`result${level}`] > players[1][`result${level}`]) {
        // Get the new group that player should be added to
        //Get the latest group
        let latestGroup = Math.max(
          ...newTournment.players.map((player) =>
            player[`group${level + 1}`] ? player[`group${level + 1}`] : 1
          )
        );
        // Check if latest group has room for another player
        newTournment.players.filter(
          (player) => player[`group${level + 1}`] === latestGroup
        ).length === 2
          ? latestGroup++
          : "";
        // Add the winner player to the next level
        const newPlayers = newTournment.players.map((player) => {
          const newPlayer = player;
          if (player.id == players[0].id) {
            // Create new result for the next level
            newPlayer[`result${level + 1}`] = null;
            newPlayer.level = level + 1;
            newPlayer[`group${level + 1}`] = latestGroup;
          }
          return newPlayer;
        });
        newTournment.players = newPlayers;
      } else {
        // Get the new group that player should be added to
        let latestGroup = Math.max(
          ...newTournment.players.map((player) =>
            player[`group${level + 1}`] ? player[`group${level + 1}`] : 1
          )
        );
        // Check if latest group has room for another player
        newTournment.players.filter(
          (player) => player[`group${level + 1}`] === latestGroup
        ).length === 2
          ? latestGroup++
          : "";
        // Add the winner player to the next level
        const newPlayers = newTournment.players.map((player) => {
          const newPlayer = player;
          if (player.id == players[1].id) {
            newPlayer[`result${level + 1}`] = null;
            newPlayer.level = level + 1;
            newPlayer[`group${level + 1}`] = latestGroup;
          }
          return newPlayer;
        });
        newTournment.players = newPlayers;
      }
      // Update the tournment on the server
      updateDoc(gameRef, { ...newTournment })
        .then(() => {
          setTournment(newTournment);
          setOpenLoading(false);
          setMsg({
            open: true,
            message: "New scores submitted",
            type: "success",
          });
        })
        .catch((err) => {
          setOpenLoading(false);
          setMsg({
            open: true,
            message: err.message,
            type: "error",
          });
        });
    }
  };

  // Put each player into related group and return the groups
  const getGroups = (level) => {
    const list = tournment.players.filter((player) => player.level >= level);
    const groups = [];
    for (let i = 1; i <= Math.ceil(list.length / 2); i++) {
      const groupPlayers = list.filter(
        (player) => player[`group${level}`] === i
      );
      groups.push(
        <div className={styles.group}>
          <h5>Group {i}</h5>
          {groupPlayers.map((player) => (
            <div className={styles.player} key={player.id}>
              <div>{player.playerName}</div>
              <input
                className={`${styles.playerInput}  ${
                  darkMode ? styles.darkInput : styles.lightInput
                }`}
                value={player[`result${level}`]}
                type="number"
                readOnly={groupPlayers[0]?.level != groupPlayers[1]?.level}
                onChange={(e) => setScore(e.target.value, player.id, level)}
              />
            </div>
          ))}
          {groupPlayers[0]?.level == groupPlayers[1]?.level &&
            !tournment.finished && (
              <Button
                className="btn"
                variant="outlined"
                onClick={() => submitScore(groupPlayers)}
              >
                Submit the scores
              </Button>
            )}
        </div>
      );
    }

    return groups;
  };

  // Put groups in to related rounds of play
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
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {tournment && (
        <>
          <h1>{tournment.name}</h1>
          {/* Show the champion name when game finished */}
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
      {/* Shows loading bar during updating the tournment on server */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
