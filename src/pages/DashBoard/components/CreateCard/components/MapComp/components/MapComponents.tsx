import { useMap, useMapEvents} from 'react-leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import type { LatLonType, ClickHandlerType } from "@/types/types"

export function SetInitialView() {
  const map = useMap()
  map.setView([-14.2350, -51.9253], 4)
  return null
}
export function ClickHandler({onCreateState}: ClickHandlerType) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng.wrap()
      const latlng: LatLonType = {
        title: "",
        id: "",
        lat: lat,
        lon: lng
      }
      onCreateState(latlng)
    }
  })
  return null
}
