import { useContext, useEffect, useState } from "react";
import { Msg, logStatus } from "@/helper/Contexts";
import { useRouter } from "next/navigation";
import styles from "./CreateTournmentStyles.module.css"

export default function CreateTournment() {
  const route = useRouter();
  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);

  useEffect(() => {
    //Check If user logged in
    if (!loggedIn) {
      //Redirect to landing page
      route.push("./");
    }
  }, [loggedIn]);
  return <div className={styles.container}>
  </div>;
}
