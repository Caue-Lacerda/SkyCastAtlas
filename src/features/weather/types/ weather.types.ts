export type WeatherCurrentUnits = {
  time: "iso8601"
  interval: "seconds"
  temperature_2m: string
  is_day: string
  weathercode: string
  windspeed_10m: string
  winddirection_10m: string
  visibility: string
};

export type WeatherCurrent = {
  time: string 
  interval: number
  temperature_2m: number
  is_day: number
  weathercode: number
  windspeed_10m: number
  winddirection_10m: number
  visibility: number
};

export type WeatherDaily = {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
}

export type WeatherDailyUnits = {
  time: "iso8601"
  temperature_2m_max: string
  temperature_2m_min: string
  precipitation_probability_max: string
};

export type WeatherHourly = {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  weathercode: number[]
  is_day: number[]
}

export type WeatherHourlyUnits = {
  time: "iso8601"
  temperature_2m: string
  precipitation_probability: string
  weathercode: string
  visibility: string
}

export type WeatherResponse = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: WeatherCurrentUnits
  current: WeatherCurrent
  daily_units: WeatherDailyUnits
  daily: WeatherDaily
  hourly_units: WeatherHourlyUnits
  hourly: WeatherHourly
}