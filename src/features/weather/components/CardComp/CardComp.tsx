import { useState } from "react"
import stylesCard from "./CardComp.module.css"
import type { CardCompType, RenderLayoutHoursType } from "@/types/types"
import imgDefaultWeather from "@/assets/images/cloudy.png"
import imgDelete from "@/assets/images/delete_task.png"
import { insertSvgToWeather } from "@/features/weather/mappers/weatherMapper"
import { useWeather } from "@/features/weather/hooks/useWeather"
import { DayComp } from "./components/DayComp"
import { HoursComp } from "./components/HoursComp"

export function CardComp({search, deletion}: CardCompType) {
  const { data: cardData, isLoading: cardLoading, error: cardError } = useWeather({search})
  const [ days, onDays ] = useState<boolean>(false)
  const [ hours, onHours] = useState<[string, boolean]>(["none", false])
  if (!cardData) return null
  const svgInsertRender = insertSvgToWeather(cardData.currentDay.isDay, cardData.currentDay.weathercode)
  if (cardLoading) return (
    <div className={stylesCard.maskCardDiv}>
      <div className={stylesCard.cardComp}>
        <div className={stylesCard.cardTitleComp}><h1>Carregando Dados...</h1></div>
      </div>
    </div>
  )
  if (cardError) return (
    <div className={stylesCard.maskCardDiv}>
      <div className={stylesCard.cardComp}>
        <div className={stylesCard.cardTitleComp}>
          <h1>{search.title}</h1>
          <button onClick={() => deletion(search)}><img src={imgDelete} alt="" /></button>
        </div>
        <div className={stylesCard.cardWeatherContainer}>
          <div className={stylesCard.cardWeatherLocation}>
            <div className={stylesCard.cardWeatherContainerData}>
              <div className={stylesCard.cardWeatherLocationAndTemperature}>
                <div>
                  <div className={stylesCard.cardWeatherContainerLocationTitle}><h1>Indisponível no momento!</h1></div>
                  <div className={stylesCard.cardWeatherLocationTemperature}>
                    <h2>...</h2>
                  </div>
                </div>
                <div className={stylesCard.cardContainerSvg}><img src={svgInsertRender ? svgInsertRender : imgDefaultWeather}  alt="" /></div>
              </div>
              <div className={stylesCard.cardWeatherContainerVisibilityAndDirection}>
                <div className={stylesCard.cardWeatherLocationVisibility}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                  <h6>...</h6>
                </div>
                <div className={stylesCard.cardWeatherContainerWindSpeedDirection}>
                  <div className={stylesCard.cardWeatherLocationWindspeed}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>
                    <h6>...</h6>
                  </div>
                  <hr />
                  <div className={stylesCard.cardWeatherLocationWinddirection}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/></svg>
                    <h6>...</h6>
                  </div>
                </div>
              </div>
              <div className={stylesCard.cardContainerButtonActivatedDays}>
                <button onClick={() => onDays(!days)}>Detalhes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  function renderLayoutHours({dateDayCurrent, hours}: RenderLayoutHoursType) {
    if (dateDayCurrent == hours[0]) {
      onHours(["none", false])
    } else {
      onHours([dateDayCurrent, true])
    }
  }
  return (
    <div className={stylesCard.maskCardDiv}>
      <div className={stylesCard.cardComp}>
        <div className={stylesCard.cardTitleComp}>
          <h1>{search.title}</h1>
          <button onClick={() => deletion(search)}><img src={imgDelete} alt="" /></button>
        </div>
        <div className={stylesCard.cardWeatherContainer}>
          <div className={stylesCard.cardWeatherLocation}>
            <div className={stylesCard.cardWeatherContainerData}>
              <div className={stylesCard.cardWeatherLocationAndTemperature}>
                <div>
                  <div className={stylesCard.cardWeatherContainerLocationTitle}><h1>{cardData.currentDay.cardName}</h1></div>
                  <div className={stylesCard.cardWeatherLocationTemperature}>
                    <h2>{`${cardData.currentDay.temperature}`}</h2>
                    <span>{cardData.currentDay.temperatureUnit}</span>
                  </div>
                </div>
                <div className={stylesCard.cardContainerSvg}><img src={svgInsertRender ? svgInsertRender : imgDefaultWeather}  alt="" /></div>
              </div>
              <div className={stylesCard.cardWeatherContainerVisibilityAndDirection}>
                <div className={stylesCard.cardWeatherLocationVisibility}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                  <h6>{`${((cardData.currentDay.visibility ?? 0) / 1000).toFixed(2)}`}</h6>
                  <span>km</span>
                </div>
                <div className={stylesCard.cardWeatherContainerWindSpeedDirection}>
                  <div className={stylesCard.cardWeatherLocationWindspeed}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>
                    <h6>{`${cardData.currentDay.windspeed}`}</h6>
                    <span>{cardData.currentDay.windspeedUnit}</span>
                  </div>
                  <hr />
                  <div className={stylesCard.cardWeatherLocationWinddirection}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/></svg>
                    <h6>{cardData.currentDay.winddirection}</h6>
                    <span>{cardData.currentDay.winddirectionUnits}</span>
                  </div>
                </div>
              </div>
              <div className={stylesCard.cardContainerButtonActivatedDays}>
                <button onClick={() => onDays(!days)}>Detalhes</button>
              </div>
            </div>
          </div>
          {days ? 
            <div>
              <div className={stylesCard.cardContainerDays}>
                {cardData.forecastDays.map((day) => (
                  <div className={stylesCard.DaysContainerCard} key={`hours-${hours}-${day.temperature2mMax}-${day.precipitationProbaMax}-${hours}-${day.temperature2mMin}`}>
                    <DayComp day={day} hours={hours} dateDayCurrent={renderLayoutHours}/>
                  </div>
                ))}
              </div>
              <div className={stylesCard.cardContainerHours}>
                {hours[1] && cardData.forecastDays.map((day) => (
                  <div className={stylesCard.DaysContainerCard} key={`day-${day.time}-${day.temperature2mMax}-${day.precipitationProbaMax}-${hours}`}>
                    <HoursComp day={day} hours={hours}/>
                  </div>
                ))}
              </div>
            </div> : null}
        </div>
      </div>
    </div>
  )
}

