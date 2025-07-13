import { useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { registerUser } from "@/api/user";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onRegister = async () => {
    try {
      const response = await registerUser({ username, email, password });

      Cookies.set("qa-app-user-jwt-token", response.data.jwt);
      setErrorMessage("");
      router.push("/login");
    } catch (err: any) {
      if (err?.response?.status === 400) {
        setErrorMessage("Invalid registration data");
      } else {
        setErrorMessage("Unexpected error, please try again");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register to BlitzQuestions</h1>

      <div className={styles.form}>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={onRegister}>Register</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
