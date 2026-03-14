export type ButtonType = {
  state: boolean
  stateChanger: (state:  boolean) => void
  text: string
  classNameCustom?: string
}

export type LatLonType = {
  title: string
  id: string
  lat: number
  lon: number
}

export type ClickHandlerType = {
  onCreateState: (state: LatLonType) => void
}

export type CreateCardType = {
  displayOn: boolean
  onDisplayOn: (display: boolean) => void
  createState: LatLonType | undefined
  onCreateState: (state: LatLonType) => void 
  listCards: LatLonType[]
  onListCards: (Cards: LatLonType[]) => void
}

export type FormCreateCardType = {
  createState: LatLonType | undefined
  name: string
  onName: (state: string) => void
  createCard: ({load, card}: {load: boolean; card?: LatLonType}) => void
}

export type SaveLoadLocationType = {
  createState: LatLonType | undefined
  name: string
  createCard: ({load, card}: {load: boolean; card?: LatLonType}) => void
}

export type SaveLocationsType = {
  createState: LatLonType | undefined
  name: string
}

export type CaseLocationsType = {
  currentLocation: LatLonType
  deleteCard: (currentLocation: LatLonType) => void
  createCard: ({load, card}: {load: boolean; card?: LatLonType}) => void
}

export type MapCompType = {
  onCreateState: (state: LatLonType) => void
}

type ObjDayNightType = {
  clear: string
  cloudy: string[]
  fog: string[]
  drizzle: string[]
  rain: string[]
  snow: string[]
  rainShower: string[]
  snowShower: string[]
  thunderStorm: string[]
}

export type ObjPathSvgWeatherType = {
  day: ObjDayNightType
  night: ObjDayNightType
}

export type CurrentWeatherType = {
  cardName: string
  temperature: number
  temperatureUnit: string
  visibility: number
  windspeed: number
  windspeedUnit: string
  winddirection: number
  winddirectionUnits: string
  isDay: number
  weathercode: number
}

export type DailyApiType = {
  time: string[]
  temperature2mMax: number[]
  temperature2mMin: number[]
  precipitationProbaMax: number[]
  temperatureUnit: string
  probabilityUnit: string
}

export type HourlyApiType = {
  time: string[]
  temperature2m: number[]
  precipitationProbaMax: number[]
  weathercode: number[]
  is_day: number[]
}

export type WeatherNextDayType = {
  time: string
  temperature2mMax: number
  temperature2mMin: number
  precipitationProbaMax: number
  temperatureUnit: string
  probabilityUnit: string
  hoursData: WeatherNextDayHoursType
}

export type WeatherNextDayHoursType = {
  time: string[]
  temperature2m: number[]
  precipitationProbaMax: number[]
  weathercode: number[]
  is_day: number[]
}

export type DayCompType = {
  day: WeatherNextDayType
  hours: [string, boolean]
  dateDayCurrent: (state: RenderLayoutHoursType) => void
}

export type HoursCompType = {
  day: WeatherNextDayType
  hours: [string, boolean]
}

export type RenderLayoutHoursType = {
  dateDayCurrent: string
  hours: [string, boolean]
}

export type HoursDataType = {
  time: string
  temperature2m: number
  precipitationProbaMax: number
  weathercode: number
  is_day: number
}

export type SaveLayoutsType = {
  displayOn: boolean
  onDisplayOn: (state: boolean) => void
  listCards: LatLonType[]
  refCardArea: React.RefObject<HTMLDivElement | null>
}

export type CardsLayoutSaveType = {
  id: string
  name: string
  preview: string
  card: LatLonType[]
}

export type CardCompType = {
  search: LatLonType
  deletion: (obj: LatLonType) => void
}

export type LoadLayoutsType = {
  displayOn: boolean
  onDisplayOn: (state: boolean) => void
  listCards: LatLonType[]
  onListCards: (state: LatLonType[]) => void
}