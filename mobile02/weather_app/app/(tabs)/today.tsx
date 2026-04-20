import React from 'react'
import { Text, View,StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import {getWeatherDescription} from "../utils/weatherCode"

const today = ({location,weather,permission,error}:any) => {



   if(error)
   {
     return (
       <View style={styles.container}>
         <Text>{error}</Text>
       </View>
     )
   }

  const today = new Date().toISOString().split("T")[0];
const item = Array.isArray(location) ? location[0] : location;

  const todayData = weather?.hourly?.time?.map((time:string, index:number)=>({
    time: time,
    temperature: weather?.hourly?.temperature_2m[index],
    code:  weather?.hourly?.weather_code[index],
    wind:  weather?.hourly?.wind_speed_10m[index],
       
    })).filter((item:any)=>item?.time?.startsWith(today))
    
  
  return (
    <View style={styles.container}>
        {
          permission?
          <>
              <Text style={styles.text} >{permission?.city}</Text>
              <Text style={styles.text} >{permission?.state}</Text>
              <Text style={styles.text} >{permission?.country}</Text>
               <ScrollView style={{width:"100%",height:"100%"}}>
              {todayData?.map((item:any, index:number) => (
                <View key={index} style={styles.weatherList}>
                  <Text style={styles.text}>{item.time.split("T")[1]}</Text>
                  <Text style={styles.text}>{item.temperature}°C</Text>
                  <Text style={styles.text}>{getWeatherDescription(item.code)}</Text>
                  <Text style={styles.text}>{item.wind} km/h</Text>
                </View>
              ))}
            </ScrollView>
                      
          </>
          :
          !permission && !location ?
          <>
            <Text style={styles.textWarning} >Permission needed,</Text>
            <Text style={styles.textWarning}>Please enable location in settings</Text>
          </>
          :
          <>
            <Text style={styles.text} >{item ? `${item?.name},` : ""}</Text>
            <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" }</Text>
            <Text style={styles.text} >{item ?  `${item?.country}` : "" }</Text>
            <ScrollView style={{width:"100%",height:"100%"}}>
              {todayData?.map((item:any, index:number) => (
                <View key={index} style={styles.weatherList}>
                  <Text style={styles.text}>{item.time.split("T")[1]}</Text>
                  <Text style={styles.text}>{item.temperature}°C</Text>
                  <Text style={styles.text}>{getWeatherDescription(item.code)}</Text>
                  <Text style={styles.text}>{item.wind} km/h</Text>
                </View>
              ))}
            </ScrollView>
          </>
        }    
    </View>
  )}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    padding:8
  },
  text:{
    fontSize:20,
    textAlign:"center"

  },
  textWarning:{
    fontSize:20,
    color:"#FC2947"

  },
  weatherList:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    padding:6

  },
 
})

export default today
