import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import styles from "./MapComp.module.css"
import type { LatLonType, MapCompType } from "@/types/types"
import { MapContainer, Marker, TileLayer} from 'react-leaflet'
import { ClickHandler, SetInitialView } from "./components/MapComponents";
import { useState } from 'react';
import markerIcon from "@/assets/images/marker.png"

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 30]
})

export function MapComp({onCreateState}: MapCompType) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const handleMapClick = (latlng: LatLonType) => {
    setPosition([latlng.lat, latlng.lon])
    onCreateState(latlng)
  }
  return (
    <div className={styles.mapDiv}>
      <MapContainer className={styles.map}>
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SetInitialView/>
        <ClickHandler onCreateState={handleMapClick}/>
        {position && <Marker position={position} icon={customIcon}/>}
      </MapContainer>
    </div>
  )
}