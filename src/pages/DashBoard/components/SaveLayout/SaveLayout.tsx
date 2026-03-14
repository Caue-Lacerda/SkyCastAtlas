import type { CardsLayoutSaveType, LatLonType, SaveLayoutsType } from "@/types/types"
import styles from "./SaveLayout.module.css"
import imageExit from "@/assets/images/delete_task.png"
import imgLoading from "@/assets/images/sync.png"
import { useState } from "react"
import { toPng } from "html-to-image"

export function SaveCard({displayOn, onDisplayOn, listCards, refCardArea}: SaveLayoutsType) {
  if(!displayOn) return null
  const [ name, onName ] = useState<string>("")
  const [ loading, onLoading ] = useState<boolean>(true)
  async function saveLayoutCards() {
    if (listCards.length >= 1) {
      onLoading(false)
      onDisplayOn(false)
      let LayoutsLoads: CardsLayoutSaveType[] = JSON.parse(localStorage.getItem("LayoutsSaved") || "[]")
      if (LayoutsLoads != null) {
        if (!refCardArea.current) return
        if (LayoutsLoads.length === 0) {
          handleSaveLayout(listCards, refCardArea, name, LayoutsLoads)
          onDisplayOn(false)
        } else {
          let result: boolean = LayoutsLoads.some(card => card.id === idCombineCards(listCards))
          if (!result) {
            handleSaveLayout(listCards, refCardArea, name, LayoutsLoads)
            localStorage.setItem("LayoutsSaved", JSON.stringify(LayoutsLoads))
          } else {
            onLoading(true)
          }
        }
      }
    }
  }
  return (
    <div className={styles.maskDivSaveCard}>
      <div className={styles.containerDivSaveCard}>
        <div className={styles.containerDivButtonExitSaveCard}><button onClick={() => onDisplayOn(false)}><img src={imageExit} alt="" /></button></div>
        <div className={styles.containerDivFormSaveCard}>
          <div>
            <label htmlFor="layout-card-name">Nome</label>
            <input id="layout-card-name" type="text" placeholder="Nome do Layout" value={name} onChange={(e) => onName(e.target.value)}/>
          </div>
        </div>
        {loading 
        ? <div className={styles.containerDivButtonSave}><button onClick={() => saveLayoutCards()}>Salvar</button></div> 
        : <div className={styles.containerDivButtonSaveLoading}><img src={imgLoading}/></div>}
      </div>
    </div>
  )
}

function idCombineCards(cardsList: LatLonType[]) {
  let idCombine: string = ""
  cardsList.forEach((card) => {
    idCombine += (card.id + "//")
  })
  return idCombine
}

async function handleSaveLayout(listCards: LatLonType[], refCardArea: React.RefObject<HTMLDivElement | null>, name: string, LayoutsLoads: CardsLayoutSaveType[]) {
  if (!refCardArea.current) return
  const id: string = idCombineCards(listCards)
  const img: string = await toPng(refCardArea.current, { pixelRatio: 0.5, style: { margin: '0', padding: '0' } })
  const obj: CardsLayoutSaveType = {
    id: id,
    name: name,
    preview: img,
    card: listCards
  }
  LayoutsLoads.push(obj)
  localStorage.setItem("LayoutsSaved", JSON.stringify(LayoutsLoads))
}