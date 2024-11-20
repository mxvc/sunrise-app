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
  return dayjs(sunrise).format("YYYY-MM-DD HH:mm:ss")
}


