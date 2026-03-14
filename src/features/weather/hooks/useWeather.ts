import type { LatLonType, CurrentWeatherType, WeatherNextDayType} from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import { fetchAddress, fetchWeather } from "../api/fetchData"
import { dataToRenderCurrentWeather, dataToRenderDaysAndHours } from "../mappers/formatDataToRender"
import { queueRequest } from "@/services/requestQueue"

export function useWeather({search}:{search: LatLonType}) {
  return useQuery({
    queryKey: ['address', search.lat, search.lon],
    queryFn: async () => {
      const [address, weather] = await Promise.all([
        queueRequest(() => fetchAddress(search.lat, search.lon)),
        fetchWeather(search.lat, search.lon)
      ])
      const currentWeather: CurrentWeatherType = dataToRenderCurrentWeather(address.results[0], weather)
      const daysHoursWeather: WeatherNextDayType[] = dataToRenderDaysAndHours(weather)
      return {
        currentDay: currentWeather,
        forecastDays: daysHoursWeather
      }
    },
  })
}