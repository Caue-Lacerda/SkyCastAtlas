import { useState } from 'react';
import 'leaflet/dist/leaflet.css'
import styles from "./CreateCard.module.css"
import type { CreateCardType, LatLonType } from "@/types/types"
import { FormCreateCard } from './components/FormCreateCard/FormCreateCard'; 
import { SaveLoadLocation } from '@/features/locationsCardsSave/components/SaveLoadLocation';
import { GenerateKey } from '@/utils/utils';
import { MapComp } from './components/MapComp/MapComp';
import imgExit from "@/assets/images/delete_task.png"

export function CreateCard({displayOn, onDisplayOn, createState, onCreateState, listCards, onListCards}: CreateCardType) {
  const [ name, onName ] = useState<string>("")
  const [ openMap, onOpenMap ] = useState<boolean>(false)
  if (!displayOn) return null
  function createCard({load, card}: {load: boolean; card?: LatLonType}) {
    if (load) {
      if (!card) return
      if (!listCards.some(cardList => cardList.lat === card.lat && cardList.lon === card.lon)) {
        onListCards([...listCards, card])
        onDisplayOn(false)
      }
    } else {
      if (!createState) return 
      if (!listCards.some(card => card.lat === createState?.lat && card.lon === createState?.lon)) {
        const newCard = {...createState, title: name, id: GenerateKey(175)}
        onListCards([...listCards, newCard])
        onDisplayOn(false)
      }
    }
  }
  return (
    <div className={styles.mapsContainer}>
      <div className={styles.exitWindow}><button onClick={() => onDisplayOn(false)}><img src={imgExit} alt="" /></button></div>
      <div className={styles.divFormSaveLoad}>
        {
          openMap 
            ? <div className={styles.mapOpenRenderDiv}>
              <div className={styles.mapSelectLocation}><button onClick={() => onOpenMap(false)}>Selecionar</button></div>
              <div><MapComp onCreateState={onCreateState}/></div>
            </div>
            : null
        }
        <div className={styles.mapContainerFormSelect}>
          <div className={styles.mapSelectLocation}><button onClick={() => onOpenMap(true)}>Selecionar Localização</button></div>
          <FormCreateCard createState={createState} name={name} onName={onName} createCard={createCard}/>
        </div>
        <SaveLoadLocation createState={createState} name={name} createCard={createCard}/>
      </div>
    </div>
  )
}
