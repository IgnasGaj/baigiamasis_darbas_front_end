import { useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { loginUser } from "@/api/user";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await loginUser({ email, password });

      Cookies.set("qa-app-user-jwt-token", response.data.jwt);
      Cookies.set("qa-app-user-username", response.data.username);

      setErrorMessage("");
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Unexpected error, please try again");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>BlitzQuestions</h1>

      <div className={styles.form}>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onLogin}>Login</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
