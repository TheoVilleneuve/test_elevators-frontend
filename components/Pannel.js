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

   useEffect(() => {
    console.log('Current floor is', currentFloor)
  }, [currentFloor]);

  useEffect(() => {
    console.log('IS DOOR OPEN ?', doorStatus)
  }, [doorStatus]);

  useEffect(() => {
    console.log('REQFLOOR IS', reqFloor)
  }, [reqFloor]); 

  let numOfFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [buttonStates, setButtonStates] = useState(Array(10).fill(false));
  const [clickedFloor, setClickedFloor] = useState(null);

  const buttons = numOfFloors.map((e) => {
    return (
      <button
        key={e}
        onClick={() => handleElevatorBtn(e)}
        style={{
          backgroundColor:
            buttonStates[e-1] && currentFloor !== e
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

  const handleElevatorBtn = (floor) => {
    dispatch(updateReqFloor(floor));
    setClickedFloor(floor);

    const newButtonStates = buttonStates.map((state, index) =>
      index === floor - 1 ? true : state
    );
    setButtonStates(newButtonStates);

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
        <div className={styles.indicator}>🔼</div>
        <div className={styles.indicator}>🔆</div>
        <div className={styles.indicator}>🔽</div>
      </div>
    </div>
  );
}
