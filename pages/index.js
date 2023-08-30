import styles from "../styles/index.module.css";
import BuildingTable from "../components/BuildingTable";
import Pannel from "../components/Pannel";
import Header from "../components/Header";

export default function Index() {
  return (
    <div className={styles.index}>
      <Header/>
      <div className={styles.container}>
      <Pannel />
      <BuildingTable />
      </div>
      
    </div>
  );
}
