import styles from "./FormCreateCard.module.css"
import type { FormCreateCardType } from "@/types/types"

export function FormCreateCard({createState, name, onName, createCard}: FormCreateCardType) {
  return (
    <div className={styles.divLatLonCreateCard}>
      <div>
        <div className={styles.dialLatLonContainer}>
          <div>
            <div className={styles.dialLatLonDiv}><h2>Latitude</h2><h3>{createState ? createState.lat : ""}</h3></div>
            <div className={styles.dialLatLonDiv}><h2>Longitude</h2><h3>{createState ? createState.lon : ""}</h3></div>
          </div>
        </div>
        <div className={styles.nameCaption}>
            <div>
              <label htmlFor="name-card">Nome</label>
              <input id="name-card" type="text" placeholder="Nome da Localização" value={name} onChange={(e) => onName(e.target.value)}/>
            </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonCreate} onClick={() => createCard({load: false, card: undefined})}>Criar Card</button>
        </div>
      </div>
    </div>
  )
}