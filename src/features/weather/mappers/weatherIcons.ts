import type { ObjPathSvgWeatherType } from "@/types/types"
const iconsDay = import.meta.glob<{default: string}>("@/assets/weather/day/*.svg", { eager: true })
const iconsNight = import.meta.glob<{default: string}>("@/assets/weather/night/*.svg", { eager: true })
const iconsDayConverted = createObjectSvgPaths(iconsDay)
const iconsNightConverted = createObjectSvgPaths(iconsNight)
export const objPathSvgRender: ObjPathSvgWeatherType = createObjectSvgToRender(iconsDayConverted, iconsNightConverted) ?? {} as ObjPathSvgWeatherType

function createObjectSvgPaths(object: Record<string, {default: string}>) {
  const obj: [chava: string, obj: string][] = []
  Object.entries(object).forEach(([key, content]) => {
    const module = content as {default: string}
    let list: [chava: string, obj: string] = [key, module.default]
    obj.push(list)
  })
  if (obj) {
    const objImage = obj.reduce<Record<string, string>>((accumulator, [key, content]) => {
      accumulator[pathKeyConverter(key)] = content
      return accumulator
    }, {})
    return objImage
  }
}

function pathKeyConverter(content: string) {
  let contentClone: string = content
  let array: string[] = contentClone.split("")
  let init: number = array.lastIndexOf("/") + 1
  let end: number = array.lastIndexOf(".svg") - 3
  let name = array.slice(init, end).join("")
  let nameList = name.split("-")
  for (let x = 0; x < nameList.length; x++) {
    nameList[x] = nameList[x].replace(nameList[x][0], nameList[x][0].toUpperCase())
  }
  return nameList.join("")
}

function createObjectSvgToRender(iconsDayConverted: Record<string, string> | undefined, iconsNightConverted: Record<string, string> | undefined): ObjPathSvgWeatherType | undefined {
  if (iconsDayConverted && iconsNightConverted) {
    const objPathSvg: ObjPathSvgWeatherType = {
      day: {
        clear: iconsDayConverted["WiDaySunny"],
        cloudy: [iconsDayConverted["WiDaySunnyOvercast"], iconsDayConverted["WiDayCloudy"], iconsDayConverted["WiDayCloudy"]],
        fog: [iconsDayConverted["WiDayFog"], iconsDayConverted["WiDayFog"]],
        drizzle: [iconsDayConverted["WiDaySprinkle"], iconsDayConverted["WiDaySprinkle"], iconsDayConverted["WiDaySprinkle"], iconsDayConverted["WiDayRainMix"], iconsDayConverted["WiDayRainMix"]],
        rain: [iconsDayConverted["WiDayRain"], iconsDayConverted["WiDayRain"], iconsDayConverted["WiDayRainWind"], iconsDayConverted["WiDayRainMix"], iconsDayConverted["WiDayRainMix"]],
        snow: [iconsDayConverted["WiDaySnow"], iconsDayConverted["WiDaySnow"], iconsDayConverted["WiDaySnowWind"], iconsDayConverted["WiDaySnow"]],
        rainShower: [iconsDayConverted["WiDayShowers"], iconsDayConverted["WiDayShowers"], iconsDayConverted["WiDayStormShowers"]],
        snowShower: [iconsDayConverted["WiDaySnow"], iconsDayConverted["WiDaySnowWind"]],
        thunderStorm: [iconsDayConverted["WiDayThunderstorm"], iconsDayConverted["WiDayStormShowers"], iconsDayConverted["WiDayStormShowers"]]
      },
      night: {
        clear: iconsNightConverted["WiNightClear"],
        cloudy: [iconsNightConverted["WiNightAltPartlyCloudy"], iconsNightConverted["WiNightAltCloudy"], iconsNightConverted["WiNightCloudy"]],
        fog: [iconsNightConverted["WiNightFog"], iconsNightConverted["WiNightFog"]],
        drizzle: [iconsNightConverted["WiNightAltSprinkle"], iconsNightConverted["WiNightAltSprinkle"], iconsNightConverted["WiNightAltSprinkle"], iconsNightConverted["WiNightAltRainMix"], iconsNightConverted["WiNightAltRainMix"]],
        rain: [iconsNightConverted["WiNightAltRain"], iconsNightConverted["WiNightAltRain"], iconsNightConverted["WiNightAltRainWind"], iconsNightConverted["WiNightAltRainMix"], iconsNightConverted["WiNightAltRainMix"]],
        snow: [iconsNightConverted["WiNightAltSnow"], iconsNightConverted["WiNightAltSnow"], iconsNightConverted["WiNightAltSnowWind"], iconsNightConverted["WiNightAltSnow"]],
        rainShower: [iconsNightConverted["WiNightAltShowers"], iconsNightConverted["WiNightAltShowers"], iconsNightConverted["WiNightAltStormShowers"]],
        snowShower: [iconsNightConverted["WiNightAltSnow"], iconsNightConverted["WiNightAltSnowWind"]],
        thunderStorm: [iconsNightConverted["WiNightAltThunderstorm"], iconsNightConverted["WiNightAltStormShowers"], iconsNightConverted["WiNightAltStormShowers"]]
      }  
    }
    if (objPathSvg != undefined) {
      return objPathSvg
    }
  }
}