import styles from "../styles/buildingTable.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openDoor, shutDoor, updateCurrentPosition, updateReqFloor, resetReqFloor } from '../reducers/elevator1';

export default function BuildingTable() {
  const dispatch = useDispatch();

  const currentFloor = useSelector((state) => state.elevator1.value.currentPosition)
  const reqFloor = useSelector((state) => state.elevator1.value.reqFloor)
  const doorStatus = useSelector((state) => state.elevator1.value.isDoorOpen)

  useEffect(() => {
    console.log('Current floor is',currentFloor)
  }, [currentFloor]);

  useEffect(() => {
    console.log('IS DOOR OPEN ?',doorStatus)
  }, [doorStatus]);

  useEffect(() => {
    console.log('REQFLOOR IS',reqFloor)
  }, [reqFloor]);

  // Utilisez un tableau d'états pour les boutons
  const [buttonStates, setButtonStates] = useState([Array(10)].fill(false));

  const nbrOfFloors = 10;

  const handleCallElevator = (floor) => {

    dispatch(updateReqFloor(3)) 
    console.log('IN FUNCTION REQFLOOR IS', reqFloor)

    const newButtonStates = buttonStates.map((state, index) => index === floor - 1 ? true : state);
    setButtonStates(newButtonStates); 
    
    console.log('NEW BTN STATES',newButtonStates)
    
    if(currentFloor !== floor){
      // elevator shut its door
      dispatch(shutDoor())
      // call request is saved in DB history
      fetch(`https://test-elevators-backend.vercel.app/elevatorHistory/addmove/elevator1/${currentFloor}/${floor}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
        }
      });
      // elevator goes to the floor requested
      setTimeout(() => {
        dispatch(updateCurrentPosition(floor));
      }, 1000);
      setTimeout(() => {
        dispatch(dispatch(openDoor()));
      }, 2000);
      
      // dispatch(resetReqFloor())

    } else {dispatch(openDoor())}

    
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
                <td className={styles.elevatorIndicatorCell}>{currentFloor === floorNumber ? '🟢' : '🔴'}</td>
                <td>
                  {/* Utilisez la valeur du tableau d'états pour ajouter la classe */}
                  <button 
                  className={styles.callBtn} 
                  style={{
                    backgroundColor:
                      buttonStates[floorNumber - 1] && currentFloor !== floorNumber
                        ? 'blue' // Changez cette couleur selon vos besoins
                        : '', // Utilisez la couleur d'origine ou vide si ce n'est pas nécessaire
                  }}
                  onClick={() => handleCallElevator(floorNumber)}>Call</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};