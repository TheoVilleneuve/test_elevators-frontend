import styles from "../styles/index.module.css";
import BuildingTable from "../components/BuildingTable";
import Pannel from "../components/Pannel";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Index() {
  const [history, setHistory] = useState([]);

  const isConnected = useSelector((state) => state.user.value.isConnected);

  //Get the history to display it for admins
  useEffect(() => {
    fetch(`https://test-elevators-backend.vercel.app/elevatorHistory`)
      .then((response) => response.json())
      .then((data) => {
        setHistory(data.moves);
      });
  }, [history]);

  //Display history by mapping in the results
  const requests = history.map((data, i) => {
    return (
      <div>
        <p className={styles.request}>
          {data.elevatorID} moved from floor n°{data.departureFloor} to floor n°
          {data.arrivalFloor}
        </p>
      </div>
    );
  });

  return (
    <div className={styles.index}>
      <Header />
      <div className={styles.container}>
        <Pannel />
        <BuildingTable />
      </div>

      {/* Conditionnal display: if the user is logged and an admin, the history will be displayed */}
      {isConnected === true && (
        <div className={styles.historyContainer}>{requests}</div>
      )}
    </div>
  );
}
