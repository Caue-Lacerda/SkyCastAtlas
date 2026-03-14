import type { DayCompType } from "@/types/types";
import stylesDay from "./DayComp.module.css"

export function DayComp({day, hours, dateDayCurrent}: DayCompType) {
  return (
    <div  className={stylesDay.dayContainer}>
      <div className={stylesDay.dayContainerData}>
        <div className={stylesDay.cardDayh1Container}><h1>{formaterDate(day.time)}</h1></div>
        <div className={stylesDay.cardDayh2Container}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 8a4 4 0 0 0-1.645 7.647"/><path d="M2 12h2"/><path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="m4.93 4.93 1.41 1.41"/><path d="m6.34 17.66-1.41 1.41"/></svg>
          <h2>{day.temperature2mMax}<span>{day.temperatureUnit}</span></h2>
        </div>
        <div className={stylesDay.cardDayh3Container}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="M10.585 15H10"/><path d="M2 12h6.5L10 9"/><path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h2"/></svg>
          <h3>{day.temperature2mMin}<span>{day.temperatureUnit}</span></h3>
        </div>
        <div className={stylesDay.cardDayh4Container}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256"><path d="M156,16A76.2,76.2,0,0,0,84.92,64.76,53.26,53.26,0,0,0,76,64a52,52,0,0,0,0,104h37.87L97.14,195.88A8,8,0,0,0,104,208h25.87l-16.73,27.88a8,8,0,0,0,13.72,8.24l24-40A8,8,0,0,0,144,192H118.13l14.4-24H156a76,76,0,0,0,0-152Zm0,136H76a36,36,0,0,1,0-72,38.11,38.11,0,0,1,4.78.31q-.56,3.57-.77,7.23a8,8,0,0,0,16,.92A60.06,60.06,0,1,1,156,152Z"></path></svg>
          <h4>{day.precipitationProbaMax}{day.probabilityUnit}</h4>
        </div>
        <div className={stylesDay.cardButtonHoursContainer}>
          <button onClick={() => dateDayCurrent({dateDayCurrent: day.time, hours: hours})}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="M12 6v6l4 2"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/></svg></button>
        </div>
      </div>
    </div>
  )
}

function formaterDate(dateOrigin: string) {
  const [ year, month, day ] = dateOrigin.split("-").map(Number)
  const date = new Date(year, month - 1, day);
  const weekday = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  }).format(date).replace(".", "");
  let lower = weekday.split("")[0]
  let upper =  weekday.split("")[0].toUpperCase()
  return weekday.replace(lower, upper)
}