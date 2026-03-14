import type { DailyApiType, HourlyApiType, WeatherNextDayType, CurrentWeatherType } from "@/types/types"
import type { WeatherResponse } from "../types/ weather.types"
import type { OpenCageResult } from "../types/address.types"

export function dataToRenderCurrentWeather(address: OpenCageResult, weather: WeatherResponse) {
  const currentWeather: CurrentWeatherType = {
    cardName: mapLocationExists(address),
    temperature: weather.current.temperature_2m,
    temperatureUnit: weather.current_units.temperature_2m,
    visibility: weather.current.visibility,
    windspeed: weather.current.windspeed_10m,
    windspeedUnit: weather.current_units.windspeed_10m,
    winddirection: weather.current.winddirection_10m,
    winddirectionUnits: weather.current_units.winddirection_10m,
    isDay: weather.current.is_day,
    weathercode: weather.current.weathercode
  }
  return currentWeather
}

function mapLocationExists(components: OpenCageResult) {
  
  const locationName =
    components.components?.hamlet ??
    components.components?.village ??
    components.components?.town ??
    components.components?.city ??
    components.components?.municipality ??
    components.components?.suburb ??
    "Local desconhecido"
  return locationName
}

export function dataToRenderDaysAndHours(weather: WeatherResponse) {
  let daily: DailyApiType = {
    time: weather.daily.time,
    temperature2mMax: weather.daily.temperature_2m_max,
    temperature2mMin: weather.daily.temperature_2m_min,
    precipitationProbaMax: weather.daily.precipitation_probability_max,
    temperatureUnit: weather.daily_units.temperature_2m_max,
    probabilityUnit: weather.daily_units.precipitation_probability_max
  }
  let hourly: HourlyApiType = {
    time: weather.hourly.time,
    temperature2m: weather.hourly.temperature_2m,
    precipitationProbaMax: weather.hourly.precipitation_probability,
    weathercode: weather.hourly.weathercode,
    is_day: weather.hourly.is_day
  }
  const currentWeather: WeatherNextDayType[] = formatDataToRender(daily, hourly)
  return currentWeather
}

function formatDataToRender(daily: DailyApiType, hourly: HourlyApiType) {
  let array: WeatherNextDayType[] = []
  for (let x = 0; x < daily.time.length; x++) {
    const hoursPerDay: number = hourly.time.length / daily.time.length 
    let start = x * hoursPerDay
    let end = start + hoursPerDay
    let obj: WeatherNextDayType = {
      time: daily.time[x],
      temperature2mMax: daily.temperature2mMax[x],
      temperature2mMin: daily.temperature2mMin[x],
      precipitationProbaMax: daily.precipitationProbaMax[x],
      temperatureUnit: daily.temperatureUnit,
      probabilityUnit: daily.probabilityUnit,
      hoursData: {
        time: hourly.time.slice(start, end),
        temperature2m: hourly.temperature2m.slice(start, end),
        precipitationProbaMax: hourly.precipitationProbaMax.slice(start, end),
        weathercode: hourly.weathercode.slice(start, end),
        is_day: hourly.is_day.slice(start, end)
      }
    }
    array.push(obj)
  }
  return array
}

