import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";

import { auth } from "@/config/firebase";

import styles from "./SignupStyle.module.css";

export default function Signup() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass);
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
        {loading ? (
          <RotateRightOutlinedIcon className={styles.loading} />
        ) : (
          "Create"
        )}
      </Button>
      <Button
        className={styles.btn}
        variant="outlined"
        onClick={handleSubmit(createUser)}
        disabled={loading}
      >
        {loading ? (
          <RotateRightOutlinedIcon className={styles.loading} />
        ) : (
          "Continue with Google"
        )}
      </Button>
    </div>
  );
}
