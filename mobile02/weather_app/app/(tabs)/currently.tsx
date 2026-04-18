import React from 'react'
import { Text, View,StyleSheet } from "react-native";


const currently = ({location,search,errMsg,weather}:any) => {
  const getWeatherDescription = (code:number) => {
  if (code === 0) return "Sunny";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 99) return "Storm";
  return "Unknown";
};
  console.log("currently locatioooooooooooon =>>>>",weather?.current)
  
  const item = location?location[0]:null
  console.log("currently locatioooooooooooon =>>>>",item)
  return (
    <View style={styles.container}>
        <Text style={styles.text} >{item?.name}, {item?.admin1 || item?.admin2},{item?.country}</Text>
        <Text style={styles.text}>{weather?.current?.temperature_2m}</Text>
        <Text style={styles.text}>{getWeatherDescription(weather?.current?.weather_code)}</Text>
        <Text style={styles.text}>{weather?.current?.wind_speed_10m}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    borderWidth:1,
  },
  text:{
    fontSize:30,
    fontWeight:"bold",
    maxWidth:300,

  }
})

export default currently


// "current": {"interval": 900, "temperature_2m": 29.2, "time": "2026-04-18T15:45", "weather_code": 3, "wind_speed_10m": 10.5}, "current_units": {"interval": "seconds", "temperature_2m": "°C", "time": "iso8601", "weather_code": "wmo code", "wind_speed_10m": "km/h"}, "elevation": 35, "generationtime_ms": 76.90370082855225, "latitude": 30.4375, "longitude": -9.625, 
// "timezone": "GMT", "timezone_abbreviation": "GMT", "utc_offset_seconds": 0}