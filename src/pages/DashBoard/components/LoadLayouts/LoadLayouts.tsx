import type { CardsLayoutSaveType, LoadLayoutsType } from "@/types/types"
import imgExit from "@/assets/images/delete_task.png"
import imgAdd from "@/assets/images/add_task.png"
import imgDelete from "@/assets/images/delete.png"
import { GenerateKey } from "@/utils/utils"
import styles from "./LoadLayouts.module.css"
import { useState } from "react"

export function LoadLayouts({displayOn, onDisplayOn, onListCards}: LoadLayoutsType) {
  if (!displayOn) return null
  const LayoutsLoads: CardsLayoutSaveType[] = JSON.parse(localStorage.getItem("LayoutsSaved") || "[]")
  let [renderLoads, onRenderLoads] = useState<CardsLayoutSaveType[]>(LayoutsLoads)
  function deleteLayout(layoutRender: CardsLayoutSaveType) {
    let indice: number = LayoutsLoads.findIndex(layout => layout.id == layoutRender.id)
    LayoutsLoads.splice(indice, 1)
    localStorage.setItem("LayoutsSaved", JSON.stringify(LayoutsLoads))
    onRenderLoads(prev => prev.filter(layout => layout.id != layoutRender.id))
  }
  function addLayout(layoutRender: CardsLayoutSaveType) {
    onListCards(layoutRender.card)
    onDisplayOn(false)
  }
  return (
    <div className={styles.maskDivLoadLayouts}>
      <div className={styles.containerDivLoadLayouts}>
        <div className={styles.containerDivLoadLayoutsButtonExit}>
          <button onClick={() => onDisplayOn(false)}>
            <img src={imgExit}/>
          </button>
        </div>
        <div className={styles.containerDivLoadLayoutsTitleH1}><h1>Layouts Salvos</h1></div>
        <div className={styles.containerDivLoadLayoutsAreaCardsLoaded}>
          {renderLoads.length != 0 
            ? renderLoads.map((layout) => (
              <div key={GenerateKey(20)} className={styles.containerCardLoadLayouts}>
                <div className={styles.containerCardLoadLayoutsPreviewImg}><img src={layout.preview} alt="" /></div>
                <div className={styles.containerCardLoadLayoutsTitleH1}><h1>{layout.name}</h1></div>
                <div className={styles.containerCardLoadLayoutsControlsButtons}>
                  <button onClick={() => addLayout(layout)}><img src={imgAdd} alt=""/></button>
                  <button onClick={() => deleteLayout(layout)}><img src={imgDelete} alt=""/></button>
                </div>
              </div> 
            ))
            : null
          }
        </div>
      </div>
    </div>
  )
}
