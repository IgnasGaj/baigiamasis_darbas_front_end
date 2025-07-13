import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "./styles.module.css";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("qa-app-user-jwt-token");
    Cookie.remove("qa-app-user-username");
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Logout
    </button>
  );
};

export default LogoutButton;
