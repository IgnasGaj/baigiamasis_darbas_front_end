import styles from "./styles.module.css";
import Link from "next/link";
import burgerBtnImg from "../../assets/images/burger-menu-svgrepo-com (1).svg";
import { useState } from "react";
import Cookie from "js-cookie";
import Logo from "../Logo/Logo";

const Header = () => {
  const [isShowMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <ul>
            <li>
              <Link href="/">Main</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  Cookie.remove("qa-app-user-jwt-token");
                  Cookie.remove("qa-app-user-username");
                  window.location.href = "/login";
                }}
                className={styles.logoutBtn}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <button
          className={styles.burgerBtn}
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <img src={burgerBtnImg.src} alt="Menu" />
        </button>
      </header>

      {isShowMobileMenu && (
        <>
          <div className={styles.mobileMenu}>
            <ul>
              <li>
                <Link href="/" onClick={() => setShowMobileMenu(false)}>
                  Main
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    Cookie.remove("qa-app-user-jwt-token");
                    Cookie.remove("qa-app-user-username");
                    setShowMobileMenu(false);
                    window.location.href = "/login";
                  }}
                  className={styles.logoutBtn}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div
            className={styles.overlay}
            onClick={() => setShowMobileMenu(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default Header;
