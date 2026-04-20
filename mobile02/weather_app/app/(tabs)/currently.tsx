import React from 'react'
import { Text, View,StyleSheet } from "react-native";
import {getWeatherDescription} from "../utils/weatherCode"

const currently = ({location,weather,permission,error}:any) => {
 
const item = Array.isArray(location) ? location[0] : location;
  if(error)
  {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    )

  }
  return (
    
    <View style={styles.container}>
      {
        permission?
        <>
          <Text style={styles.text} >{permission?.city}</Text>
          <Text style={styles.text} >{permission?.state}</Text>
          <Text style={styles.text} >{permission?.country}</Text>
          <Text style={styles.text}>{weather ? `${weather?.current?.temperature_2m} °C`: ""}</Text>
          <Text style={styles.text}>{weather ? getWeatherDescription(weather?.current?.weather_code) : ""}</Text>
          <Text style={styles.text}>{weather ? ` ${weather?.current?.wind_speed_10m}  km/h` : ""}</Text>
        </>
        :
        !permission && !location?
        <>
         <Text style={styles.textWarning} >Geolocation  is not available,</Text>
                     <Text style={styles.textWarning}>Please enable in your app settings</Text>
        </>
        :
        <>
          <Text style={styles.text} >{item ? `${item?.name},` : ""}</Text>
          <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" }</Text>
          <Text style={styles.text} >{item ?  `${item?.country}` : "" }</Text>
          <Text style={styles.text}>{weather ? `${weather?.current?.temperature_2m} °C`: ""}</Text>
          <Text style={styles.text}>{weather ? getWeatherDescription(weather?.current?.weather_code) : ""}</Text>
          <Text style={styles.text}>{weather ? ` ${weather?.current?.wind_speed_10m}  km/h` : ""}</Text>
        </>
      }

    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
  },
  text:{
    fontSize:30,
    maxWidth:250,
    textAlign:"center"
  },
  textWarning:{
    fontSize:20,
    color:"#FC2947"

  }
})

export default currently

