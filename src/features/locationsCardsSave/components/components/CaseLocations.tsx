import styles from "./CaseLocations.module.css"
import imageAdd from "@/assets/images/add_task.png"
import imageDelete from "@/assets/images/delete.png"
import type { CaseLocationsType } from "@/types/types"
export function CaseLocations({currentLocation, deleteCard, createCard}: CaseLocationsType) {
  return (
    <div className={styles.caseLocationsContainer}>
      <h1>{currentLocation.title}</h1>
      <div><h2>Lat</h2><h6>{currentLocation.lat}</h6></div>
      <div><h2>Lon</h2><h6>{currentLocation.lon}</h6></div>
      <div className={styles.buttonActionsDiv}>
        <button onClick={() => createCard({load: true, card: currentLocation})}><img src={imageAdd} alt=""/></button>
        <button onClick={() => deleteCard(currentLocation)}><img src={imageDelete} alt=""/></button>
      </div>
    </div>
  )
}