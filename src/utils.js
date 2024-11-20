import dayjs from "dayjs";
import SolarCalc from "solar-calc";
import Taro from "@tarojs/taro";

export function getCurrentTimeStr() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss")
}
export function getCurrentZone(){
     return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCurrentLocation(){

  return Taro.getLocation({
    type: 'wgs84',
  })


}

export function calc(date, lat,lng) {
// SolarCalc(date,lat,long)
  var solar = new SolarCalc(date, lat, lng);

  // solar.sunrise // 2015-03-08T11:35:30.000Z

  let sunrise = solar.sunrise;

  const list = [
    {
      type:'官方日出',
      sunrise: fmt(solar.sunrise),
      sunset: fmt(solar.sunset),
      remark:'太阳的上边缘在早晨出现在东方地平线上时'
    },
    {
      type:'民用日出',
      sunrise: fmt(solar.civilDawn),
      sunset: fmt(solar.civilDusk),
      remark: '当有足够的光线来区分对象时'
    },
    {
      type:'航海日出',
      sunrise: fmt(solar.nauticalDawn),
      sunset: fmt(solar.nauticalDusk),
      remark:'当有足够的阳光来区分地平线和某些物体时'
    },
    {
      type:'天文日出',
      sunrise: fmt(solar.astronomicalDawn),
      sunset: fmt(solar.astronomicalDusk),
      remark: '当天空不再完全黑暗时'
    },

  ]

return list
}

function fmt(date){
 return  dayjs(date).format("HH:mm")
}


