import styles from "./DashBoard.module.css"
import type { LatLonType } from "@/types/types"
import { useRef, useState } from "react"
import { DefaultButton } from "../../components/DefaultButton"
import { CreateCard } from "./components/CreateCard/CreateCard"
import { SaveCard } from "./components/SaveLayout/SaveLayout"
import { CardComp } from "@/features/weather/components/CardComp/CardComp"
import { LoadLayouts } from "./components/LoadLayouts/LoadLayouts"

export function DashBoard() {
  const layoutCards = useRef<HTMLDivElement>(null)
  let [create, onCreate] = useState<boolean>(false)
  let [createState, onCreateState] = useState<LatLonType>()
  let [listCards, onListCards] = useState<LatLonType[]>([])
  let [saveLayoutCards, onSaveLayoutCard] = useState<boolean>(false)
  let [loadLayouts, onLoadLayouts] = useState<boolean>(false)
  if (createState == undefined) {
    const defaultCard: LatLonType = {title: "", id: "initID", lat: 0, lon: 0}
    onCreateState(defaultCard)
  }
  function handleDeleteCard(search: LatLonType) {onListCards(prev => prev.filter(card => card.id !== search.id))}
  return (
    <div className={styles.divDashBoard}>
      <div><CreateCard displayOn={create} onDisplayOn={onCreate} createState={createState} onCreateState={onCreateState} listCards={listCards} onListCards={onListCards}/></div>
      <div><SaveCard displayOn={saveLayoutCards} onDisplayOn={onSaveLayoutCard} listCards={listCards} refCardArea={layoutCards}/></div>
      <div><LoadLayouts displayOn={loadLayouts} onDisplayOn={onLoadLayouts} listCards={listCards} onListCards={onListCards}/></div>
      <div className={styles.divButtonsControl}>
        <div><DefaultButton state={create} stateChanger={onCreate} text="Criar" classNameCustom={styles.buttonStyle}/></div>
        <div><DefaultButton state={saveLayoutCards} stateChanger={onSaveLayoutCard} text="Salvar" classNameCustom={styles.buttonStyle}/></div>
        <div><DefaultButton state={loadLayouts} stateChanger={onLoadLayouts} text="Carregar" classNameCustom={styles.buttonStyle}/></div>
      </div>
      <div className={styles.divCards}>
        <div className={styles.CardsArea} ref={layoutCards}>
          {listCards.map((Card) => (<CardComp search={Card} deletion={handleDeleteCard} key={`card-weathter-${Card.lat}-${Card.lon}-${Card.id}`}/>))}
        </div>
      </div>
    </div>
  )
}

