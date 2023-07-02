import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, InputAdornment, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

import { auth, googleProvider } from "@/config/firebase";

import styles from "./SignupStyle.module.css";
import { Msg } from "@/helper/Contexts";

export default function Signup() {
  const { setMsg } = useContext(Msg);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
      .then((userCredential) => {
        setLoading(false);
        setMsg({ open: true, message: "test", type: "success" });
      })
      .catch((err) => {});
  };

  const google = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const showMsg = () => {
    route.push("./");
    
  };

  return (
    <div className={styles.container}>
      <h2>Create New Account</h2> <br />
      <div className={styles.inputs}>
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
          {...register("passsword", { required: true })}
          id="passsword"
          label={errors.passsword ? "Password is required" : "Password"}
          variant="outlined"
          type="passsword"
          error={errors.passsword}
          onClick={() => clearErrors("passsword")}
          onChange={(e) => {
            setUserInfo((prev) => {
              return { ...prev, email: e.target.value };
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
        className={styles.btn}
        variant="outlined"
        onClick={handleSubmit(createUser)}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Create"}
      </Button>
      <Button
        className={styles.btn}
        variant="outlined"
        onClick={google}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Continue with Google"}
      </Button>
    </div>
  );
}
