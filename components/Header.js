import styles from "../styles/Header.module.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

export default function Header() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("");

  return (
    <>
      <div className={styles.header}>

        {loginStatus === false && (
          <div className={styles.tokenAuthContainer}>
            <input
              className={styles.authInput}
              type="text"
              placeholder="E-mail"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>

            <input
              className={styles.authInput}
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>

            <button
              onClick={() => handleConnection()}
              className={styles.authButton}
              id="login"
            >
              LOG IN
            </button>
          </div>
        )}

        {loginStatus === true && (
          <div className={styles.tokenAuthContainer}>
            <div>
              <h3 style={{ color: "white" }}>
                Welcome {userName} (ID:{userID}){" "}
              </h3>
            </div>

            <button
              onClick={() => handleLogOut()}
              className={styles.authButton}
              id="login"
            >
              LOG OUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
