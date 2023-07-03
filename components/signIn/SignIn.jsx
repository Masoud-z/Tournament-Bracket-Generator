import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, InputAdornment, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

import { auth, googleProvider } from "@/config/firebase";

import styles from "./SignInStyle.module.css";
import { Msg, logStatus } from "@/helper/Contexts";
import Link from "next/link";

export default function SignIn() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { loggedIn } = useContext(logStatus);
  const { setMsg } = useContext(Msg);

  useEffect(() => {
    //Check If user is already logged in
    if (loggedIn) {
      route.push("./");
    }
  }, [loggedIn]);

  const [userInfo, setUserInfo] = useState({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);

  const success = () => {
    setLoading(false);
    route.push("./");
    setMsg({
      open: true,
      message: "You logged in",
      type: "success",
    });
  };
  const error = (message) => {
    setLoading(false);
    setMsg({
      open: true,
      message: message,
      type: "error",
    });
  };
  const signIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
      .then(() => success())
      .catch((err) => error(err.message));
  };

  const google = async () => {
    setLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then(() => success())
      .catch((err) => error(err.message));
  };

  return (
    <div className={styles.container}>
      <div className="header">
        <h2>Sign In</h2>
        <Link href="./" className="backBtn">
          Back
        </Link>
      </div>
      <div className="inputs">
        <TextField
          {...register("email", { required: true })}
          id="email"
          label={errors.email ? "Email is required" : "Email"}
          variant="outlined"
          type="email"
          error={errors.email}
          onClick={() => clearErrors("email")}
          onChange={(e) => {
            setUserInfo((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...register("password", { required: true })}
          id="password"
          label={errors.passsword ? "Password is required" : "Password"}
          variant="outlined"
          type="password"
          error={errors.password}
          onClick={() => clearErrors("password")}
          onChange={(e) => {
            setUserInfo((prev) => {
              return { ...prev, pass: e.target.value };
            });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        className="btn"
        variant="outlined"
        onClick={handleSubmit(signIn)}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Sign in"}
      </Button>
      <Button
        className="btn"
        variant="outlined"
        onClick={google}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Continue with Google"}
      </Button>
    </div>
  );
}
