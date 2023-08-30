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

  //LOGIN
  const handleConnection = () => {
    fetch("https://test-elevators-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserName(data.username);
          setToken(data.token);
          setUserID(data.id);
          setLoginStatus(true);
          dispatch(
            login({
              id: data.id,
              token: data.token,
              username: data.username,
            })
          );
        }
      });
  };

  //LOGOUT
  const handleLogOut = () => {
    setLoginStatus(false)
    setToken("");
    setUserName("")
    setUserID(null);
    dispatch(logout());
  };

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
              <h3
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  color: "white",
                }}
              >
                Welcome {userName} !{" "}
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
