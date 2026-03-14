import saveImage from "@/assets/images/save.png"
import nextWhiteImage from "@/assets/images/next_white.png"
import styles from "./SaveLoadLocation.module.css"
import type { SaveLoadLocationType, LatLonType } from "@/types/types"
import { useState } from "react"
import { saveLocations, loadLocationsSaved, deleteSavedCards} from "../services/SaveLocations"
import { CaseLocations } from "./components/CaseLocations"

export function SaveLoadLocation({createState, name, createCard}: SaveLoadLocationType) {
  const [ openAmbientRender , onOpenAmbientRender] = useState<boolean>(false)
  const [ locationSave, setLocationSave] = useState<LatLonType[]>(() => loadLocationsSaved())
  function handleCreateCardLoad() {
    saveLocations({createState: createState, name: name})
    setLocationSave(loadLocationsSaved())
  }
  function handleDeleteCardLoad(currentLocation: LatLonType) {
    setLocationSave(deleteSavedCards(currentLocation, locationSave))
  }
  return (
    <div className={styles.containerSL}>
      <div className={styles.divSLGlobalClass}>
        <div className={styles.divButtonSave}>
          <button onClick={() => handleCreateCardLoad()}><img src={saveImage} alt=""/></button>
        </div>
      </div>
      <div className={styles.divSLGlobalClass}>
        <div className={styles.divOpenAmbient} style={{borderRadius: openAmbientRender ? "20px 20px 0px 0px" : "20px"}}>
          <p>Carregar</p>
          <button onClick={() => onOpenAmbientRender(prev => !prev)}><img src={nextWhiteImage} alt="" style={{transform: openAmbientRender ? "rotate(90deg)" : "rotate(180deg)"}}/></button>
        </div>
        {openAmbientRender && (
          <div className={styles.divAmbient}>
            {locationSave.map((location) => 
               <CaseLocations key={`case-id-${location.lat}-${location.lon}`} currentLocation={location}  deleteCard={handleDeleteCardLoad} createCard={createCard}/>
             )}
          </div>
          )
        }
      </div>
    </div>
  )
}