import type { SaveLocationsType, LatLonType } from "@/types/types"

export function saveLocations({createState, name}: SaveLocationsType) {
  let locationsSaved: LatLonType[] = JSON.parse(localStorage.getItem("StorageName") || "[]")
  let list: LatLonType[] = locationsSaved
  if (list.length === 0) {
    if (createState != undefined) {
      list.push({...createState, title: name})
    }
    localStorage.setItem("StorageName", JSON.stringify(list))
  }
  if (list.some(location => location.lat === createState?.lat && location.lon === createState?.lon)) {
  } else {
    if (createState != undefined) {
      list.push({...createState, title: name})
    }
    localStorage.setItem("StorageName", JSON.stringify(list))
  }
}

export function loadLocationsSaved(): LatLonType[] {
  let locationsSaved: LatLonType[] = JSON.parse(localStorage.getItem("StorageName") || "[]")
  return locationsSaved
}

export function deleteSavedCards(currentLocation: LatLonType, locationSave: LatLonType[]): LatLonType[] {
  let updateLocations: LatLonType[] = locationSave.filter(locationInList => !(locationInList.title === currentLocation.title && locationInList.lat === currentLocation?.lat && locationInList.lon === currentLocation?.lon))
  localStorage.setItem("StorageName", JSON.stringify(updateLocations))
  return updateLocations
}
