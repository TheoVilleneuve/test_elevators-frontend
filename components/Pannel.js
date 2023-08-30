import styles from "../styles/Pannel.module.css";

export default function Pannel() {
  let numOfFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const buttons = numOfFloors.map((e) => {
    return <button>{e}</button>;
  });

  return (
    <div className={styles.pannel}>
      <div className={styles.statusContainer}>
      <div className={styles.indicator}>Monte</div>
      <div className={styles.indicator}>DOOR</div>
      <div className={styles.indicator}>Descend</div>
      </div>
      
      <div className={styles.btnContainer}>{buttons}</div>
    </div>
  );
}
