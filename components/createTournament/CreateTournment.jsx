import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { collection, addDoc } from "firebase/firestore";

import { Controller, useForm } from "react-hook-form";

import { Autocomplete, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./CreateTournmentStyles.module.css";
import { Msg, logStatus, Dark } from "@/helper/Contexts";
import { auth, db } from "@/config/firebase";

export default function CreateTournment() {
  const gamesRef = collection(db, "games");
  const route = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Check If user logged in
    if (!loggedIn) {
      //Redirect to landing page
      route.push("/");
    }
  }, [loggedIn]);

  const calculatePowerOfTwo = (number) => {
    let power = 0;
    while (number > 1) {
      number /= 2;
      power++;
    }
    return power;
  };

  //Set players and the game base on number of players that user selects
  const onSetPlayer = (count) => {
    const players = [];
    for (let i = 1; i <= count; i++) {
      players.push({
        id: i,
        playerName: "",
        level: 1,
        // put each ti players into one group
        group1: Math.ceil(i / 2),
        result1: null,
      });
    }
    setGame((prev) => {
      return {
        name: prev.name,
        levels: calculatePowerOfTwo(count),
        players: players,
        groups: count / 2,
        playersCount: count,
        finished: false,
        winner: "",
      };
    });
  };
  //Create the game on the server
  const submit = async () => {
    setLoading(true);
    await addDoc(gamesRef, {
      name: game.name,
      levels: game.levels,
      players: game.players,
      groups: game.groups,
      playersCount: game.playersCount,
      uid: auth.currentUser.uid,
      created_at: new Date().getTime(),
    })
      .then((data) => {
        setLoading(false);
        route.push(`/tournment/${data.id}`);
        setMsg({
          open: true,
          message: "Game created!",
          type: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        setMsg({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  };

  //Create name input for each player and put them into related groups
  const groups = [];
  for (let i = 1; i <= game.groups; i++) {
    const groupPlayers = game.players.filter((player) => player.group1 === i);
    groups.push(
      groupPlayers.map((player) => (
        <TextField
          {...register(`player${player.id}`, { required: true })}
          key={player.id}
          id={`player${player.id}`}
          label={
            errors[`player${player.id}`]
              ? "Player name is required"
              : "Player name"
          }
          variant="outlined"
          type="text"
          error={errors[`player${player.id}`]}
          onClick={() => clearErrors(`player${player.id}`)}
          onChange={(e) => {
            setGame((prev) => {
              const newplayers = prev.players;
              newplayers[player.id - 1].playerName = e.target.value;
              return { ...prev, players: newplayers };
            });
          }}
        />
      ))
    );
  }

  return (
    <div className={`container ${darkMode ? "darkShadow" : "lightShadow"}`}>
      <div className="header">
        <h1>New Tournament</h1>
        <div onClick={route.back} className="backBtn">
          Back
        </div>
      </div>
      <div className="inputs">
        <TextField
          {...register("name", { required: true })}
          id="name"
          label={
            errors.name ? "Tournament name is required" : "Tournament name"
          }
          variant="outlined"
          type="text"
          error={errors.name}
          onClick={() => clearErrors("name")}
          onChange={(e) => {
            setGame((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        />
        <Controller
          control={control}
          name="participantsCount"
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.id === value.id}
              id="participantsCount"
              options={participantsCount}
              onChange={(event, option) => {
                onChange(option);
                onSetPlayer(option?.id);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Number of participants" />
              )}
            />
          )}
        />
      </div>
      <div className={styles.nameInputs}>
        {groups.map((group, index) => (
          <div className={styles.group} key={index}>
            <h3>Group {index + 1}</h3>
            {group}
          </div>
        ))}
      </div>
      {game.playersCount && (
        <Button
          className="btn"
          variant="outlined"
          onClick={handleSubmit(submit)}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Submit the Tournment"}
        </Button>
      )}
    </div>
  );
}

const participantsCount = [
  { label: "2", id: 2 },
  { label: "4", id: 4 },
  { label: "8", id: 8 },
  { label: "16", id: 16 },
  { label: "32", id: 32 },
  { label: "64", id: 64 },
];
