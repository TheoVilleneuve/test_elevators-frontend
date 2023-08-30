import styles from "../styles/buildingTable.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDoor,
  shutDoor,
  updateCurrentPosition,
  updateReqFloor,
  deleteReqFloor,
} from "../reducers/elevator1";

export default function BuildingTable() {
  const dispatch = useDispatch();

  const currentFloor = useSelector(
    (state) => state.elevator1.value.currentPosition
  );
  const reqFloor = useSelector((state) => state.elevator1.value.reqFloor);
  const doorStatus = useSelector((state) => state.elevator1.value.isDoorOpen);

  // useEffect(() => {
  //   console.log('Current floor is', currentFloor)
  // }, [currentFloor]);

  // useEffect(() => {
  //   console.log('IS DOOR OPEN ?', doorStatus)
  // }, [doorStatus]);

  // useEffect(() => {
  //   console.log('REQFLOOR IS', reqFloor)
  // }, [reqFloor]);

  const [buttonStates, setButtonStates] = useState(Array(10).fill(false));
  const [clickedFloor, setClickedFloor] = useState(null);

  const nbrOfFloors = 10;

  useEffect(() => {
    if (reqFloor.length > 0) {
      const nextFloor = reqFloor[0];
      dispatch(shutDoor());
      if (currentFloor < nextFloor) {
        setTimeout(() => {
          dispatch(updateCurrentPosition(currentFloor + 1));
        }, 1000);
      } else if (currentFloor > nextFloor) {
        setTimeout(() => {
          dispatch(updateCurrentPosition(currentFloor - 1));
        }, 1000);
      } else {
        // Current floor ok
        dispatch(deleteReqFloor(nextFloor));
        dispatch(openDoor());
        setClickedFloor(null);
        setTimeout(() => {
          dispatch(shutDoor());
        }, 5000);
      }
    }
  }, [currentFloor, reqFloor]);

  const handleCallElevator = (floor) => {
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
    <div className={styles.buildingTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Floor</th>
            <th>Elevator n°1 position</th>
            <th>Call buttons</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: nbrOfFloors }, (_, index) => {
            const floorNumber = index + 1;
            return (
              <tr key={floorNumber}>
                <td>Floor n°{floorNumber}</td>
                <td className={styles.elevatorIndicatorCell}>
                  {currentFloor === floorNumber ? "🔆" : "⚪️"}
                </td>
                <td>
                  <button
                    className={styles.callBtn}
                    style={{
                      backgroundColor:
                        buttonStates[floorNumber - 1] &&
                        currentFloor !== floorNumber
                          ? clickedFloor === floorNumber
                            ? "#692a00"
                            : ""
                          : "",
                    }}
                    onClick={() => handleCallElevator(floorNumber)}
                  >
                    Call
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
