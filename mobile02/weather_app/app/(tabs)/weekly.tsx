import React from 'react'
import { Text, View,StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { getWeatherDescription } from '../utils/weatherCode';

const weekly = ({location,weather,permission}:any) => {
  const item = location?location[0]:null
  
  return (
  <View style={styles.container}>

    {
      permission ?
        <View style={{flex:1,alignContent:"center",justifyContent:"center",width:"100%"}}>
          <Text style={styles.text} >{weather ? `${weather?.latitude},` : ""}</Text>
          <Text style={styles.text} >{weather ? `${weather?.longitude},` : ""}</Text>
          <ScrollView style={{width:"100%",height:"100%"}}>
            {weather?.daily?.time?.map((item:any, index:number) => (
              <View key={index} style={styles.weatherList} >
                <Text style={styles.text}>{item.split("T")[0]}</Text>
                <Text style={styles.text}>{weather?.daily?.temperature_2m_min[index]} °C</Text>
                <Text style={styles.text}>{weather?.daily?.temperature_2m_max[index]} °C</Text>
                <Text style={styles.text}>{getWeatherDescription(weather?.daily?.weather_code[index])}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      :
      !permission && !location ?
      <>
        <Text style={styles.textWarning} >Permission needed,</Text>
        <Text style={styles.textWarning}>Please enable location in settings</Text>
      </>
      :
      <View style={{flex:1,alignContent:"center",justifyContent:"center",width:"100%"}}>
        <Text style={styles.text} >{item ? `${item?.name},` : ""}</Text>
        <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" }</Text>
        <Text style={styles.text} >{item ?  `${item?.country}` : "" }</Text>
        <ScrollView style={{width:"100%",height:"100%",}}>
          {weather?.daily?.time?.map((item:any, index:number) => (
            <View key={index} style={styles.weatherList} >
              <Text style={styles.text}>{item.split("T")[0]} </Text>
              <Text style={styles.text}>{weather?.daily?.temperature_2m_min[index]} °C</Text>
              <Text style={styles.text}>{weather?.daily?.temperature_2m_max[index]} °C</Text>
              <Text style={styles.text}>{getWeatherDescription(weather?.daily?.weather_code[index])}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      }        
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,  
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    padding:8
  },
  text:{
    fontSize:15,
    textAlign:"center"
  },
  textWarning:{
    fontSize:20,
    color:"#FC2947"
  }
  ,
   weatherList:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    padding:6
  }
})

export default weekly