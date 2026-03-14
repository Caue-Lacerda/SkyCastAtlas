import { objPathSvgRender } from "./weatherIcons"

export function insertSvgToWeather(darOrNight: number, weathercode: number) {
  let svgInsert = ""
  const period = darOrNight === 1 ? objPathSvgRender.day : objPathSvgRender.night
  if (weathercode == 0) {svgInsert = period.clear}
  else if (weathercode >= 1 && weathercode <= 3) {
    if (weathercode == 1) {svgInsert = period.cloudy[0]}
    else if (weathercode == 2) {svgInsert = period.cloudy[1]}
    else if (weathercode == 3) {svgInsert = period.cloudy[2]}
  }
  else if (weathercode >= 45 && weathercode <= 48) {
    if (weathercode == 45) {svgInsert = period.fog[0]} else {svgInsert = period.fog[1]}
  }
  else if (weathercode >= 51 && weathercode <= 57) {
    if (weathercode == 51) {svgInsert = period.drizzle[0]}
    else if (weathercode == 53) {svgInsert = period.drizzle[1]}
    else if (weathercode == 55) {svgInsert = period.drizzle[2]}
    else if (weathercode == 56) {svgInsert = period.drizzle[3]}
    else if (weathercode == 57) {svgInsert = period.drizzle[4]}
  }
  else if (weathercode >= 61 && weathercode <= 67) {
    if (weathercode == 61) {svgInsert = period.rain[0]}
    else if (weathercode == 63) {svgInsert = period.rain[1]}
    else if (weathercode == 65) {svgInsert = period.rain[2]}
    else if (weathercode == 66) {svgInsert = period.rain[3]}
    else if (weathercode == 67) {svgInsert = period.rain[4]}
  }
  else if (weathercode >= 71 && weathercode <= 77)  {
    if (weathercode == 71) {svgInsert = period.snow[0]}
    else if (weathercode == 73) {svgInsert = period.snow[1]}
    else if (weathercode == 75) {svgInsert = period.snow[2]}
    else if (weathercode == 77) {svgInsert = period.snow[3]}
  }
  else if (weathercode >= 80 && weathercode <= 82)  {
    if (weathercode == 80) {svgInsert = period.rainShower[0]}
    else if (weathercode == 81) {svgInsert = period.rainShower[1]}
    else if (weathercode == 82) {svgInsert = period.rainShower[2]}
  }
  else if (weathercode >= 85 && weathercode <= 86)  {
    if (weathercode == 85) {svgInsert = period.snowShower[0]} else {svgInsert = period.snowShower[1]}
  }
  else if (weathercode >= 95 && weathercode <= 99)  {
    if (weathercode == 95) {svgInsert = period.thunderStorm[0]}
    else if (weathercode == 96) {svgInsert = period.thunderStorm[1]}
    else if (weathercode == 99) {svgInsert = period.thunderStorm[2]}
  }
  return svgInsert
}