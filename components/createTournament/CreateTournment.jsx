import { useContext, useState } from "react";
import { Msg, logStatus } from "@/helper/Contexts";

export default function CreateTournment() {
  const { setMsg } = useContext(Msg);
  const { loggedIn } = useContext(logStatus);

  useEffect(() => {
    //Check If user logged in
    if (!loggedIn) {
      //Redirect to landing page
      route.push("./");
    }
  }, [loggedIn]);
  return <></>;
}
