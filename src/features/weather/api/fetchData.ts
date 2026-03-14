export async function fetchAddress(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OpenCage API key")
  }
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
  const response = await fetch(url)
  return response.json()
}

export async function fetchWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,winddirection_10m,weathercode,is_day,visibility&hourly=temperature_2m,precipitation_probability,weathercode,is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=6&timezone=auto`
  const response = await fetch(url)
  return response.json()
}