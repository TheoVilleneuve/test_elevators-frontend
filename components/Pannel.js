import styles from "../styles/pannel.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDoor,
  shutDoor,
  updateCurrentPosition,
  updateReqFloor,
  deleteReqFloor,
} from "../reducers/elevator1";

export default function Pannel() {
  const dispatch = useDispatch();

  //Global states from reducer
  const currentFloor = useSelector(
    (state) => state.elevator1.value.currentPosition
  );
  const reqFloor = useSelector((state) => state.elevator1.value.reqFloor);
  const doorStatus = useSelector((state) => state.elevator1.value.isDoorOpen);

  //local states
  const [buttonStates, setButtonStates] = useState(Array(10).fill(false));
  const [clickedFloor, setClickedFloor] = useState(null);
  const [elevatorDirection, setElevatorDirection] = useState("");

  let numOfFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (reqFloor.length > 0) {
      const nextFloor = reqFloor[0];
      dispatch(shutDoor());
      //Elevator will go up
      if (currentFloor < nextFloor) {
        setElevatorDirection("up");
        setTimeout(() => {
          dispatch(updateCurrentPosition(currentFloor + 1));
        }, 1000);
        //Elevator will go down
      } else if (currentFloor > nextFloor) {
        setElevatorDirection("down");
        setTimeout(() => {
          dispatch(updateCurrentPosition(currentFloor - 1));
        }, 1000);
        // Current floor ok
      } else {
        setElevatorDirection("");
        dispatch(openDoor());
        setClickedFloor(null);
        setTimeout(() => {
          dispatch(deleteReqFloor(nextFloor));
          dispatch(shutDoor());
        }, 5000);
      }
    }
  }, [currentFloor, reqFloor]);

  //Map to display the buttons of the pannel
  const buttons = numOfFloors.map((e) => {
    return (
      <button
        key={e}
        onClick={() => handleElevatorBtn(e)}
        style={{
          backgroundColor:
            buttonStates[e - 1] && currentFloor !== e
              ? clickedFloor === e
                ? "#692a00"
                : ""
              : "",
        }}
      >
        {e}
      </button>
    );
  });

  // Function onClick request a floor destination
  const handleElevatorBtn = (floor) => {
    dispatch(updateReqFloor(floor));
    setClickedFloor(floor);

    const newButtonStates = buttonStates.map((state, index) =>
      index === floor - 1 ? true : state
    );
    setButtonStates(newButtonStates);

    //Save in DB the request if the elevator has a move to make
    if (currentFloor !== floor) {
      fetch(
        `https://test-elevators-backend.vercel.app/elevatorHistory/addmove/elevator1/${currentFloor}/${floor}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
          }
        });
    }
  };

  return (
    <div className={styles.pannel}>
      <div className={styles.btnContainer}>{buttons}</div>
      <div className={styles.statusContainer}>
        <div
          className={styles.indicator}
          style={{
            fontSize: "5vh",
            backgroundColor: elevatorDirection === "up" ? "#97e3ae" : "",
            border: elevatorDirection === "up" ? "solid #97e3ae 3px" : "",
          }}
        >
          🔼
        </div>
        <div
          className={styles.indicator}
          style={{
            fontSize: "6vh",
            backgroundColor: doorStatus ? "#97e3ae" : "",
            border: doorStatus ? "solid #97e3ae 3px" : "solid red 3px",
          }}
        >
          🔆
        </div>
        <div
          className={styles.indicator}
          style={{
            fontSize: "5vh",
            backgroundColor: elevatorDirection === "down" ? "#97e3ae" : "",
            border: elevatorDirection === "down" ? "solid #97e3ae 3px" : "",
          }}
        >
          🔽
        </div>
      </div>
    </div>
  );
}
