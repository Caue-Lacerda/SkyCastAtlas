import type { ButtonType } from "../types/types"

export function DefaultButton({state, stateChanger, text, classNameCustom}: ButtonType) {
  return (
    <button onClick={() => stateChanger(!state)} className={classNameCustom}>{text}</button>
  )
}