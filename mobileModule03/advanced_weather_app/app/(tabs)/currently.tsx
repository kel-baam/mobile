import React from 'react'
import { Text, View,StyleSheet,Dimensions } from "react-native";
import {getWeatherDescription} from "../utils/weatherCode"
import { Image } from "react-native";
import { getWeatherImage } from "../utils/weatherPicture"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const currently = ({location,weather,permission,error,loading}:any) => {
 
const item = Array.isArray(location) ? location[0] : location;



  if(loading) {
      return (
        <View style={styles.container}>
          <Text>Loading location...</Text>
        </View>
      );
    }
    
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
        <View style={{ alignItems:"center"}}>
          <Text style={[styles.text,{ fontSize:28 ,color: '#0e7fe2'}]} >{permission?.city}</Text>
          <Text style={styles.text} >{permission?.state},{permission?.country}</Text>

          <Text style={styles.temperature}>{weather ? `${weather?.current?.temperature_2m} °C`: ""}</Text>
          <View >
            <Text style={[styles.text,{}]}>{weather ? getWeatherDescription(weather?.current?.weather_code) : ""}</Text>
            <Image
              source={getWeatherImage(weather?.current?.weather_code)}
              style={{ width: 150, height: 150  }}
            />
          </View>
          <View style={{flexDirection:"row", alignItems:"center", gap:1}}>
            
            <FontAwesome5 name="wind" size={16} color="#0e7fe2" />
            <Text style={[styles.text,{ }]}>{weather ? ` ${weather?.current?.wind_speed_10m}km/h` : ""}</Text>
          </View>
        </View>
        :
        !permission && !location?
        <>
          <Text style={styles.textWarning} >Permission needed,</Text>
          <Text style={styles.textWarning}>Please enable location in settings</Text>
        </>
        :
        <View style={{alignItems:"center"}}>
          <Text style={[styles.text,{ color: '#0e7fe2' }]} >{item ? `${item?.name},` : ""}</Text>
          <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" },{item ?  `${item?.country}` : "" }</Text>
        
          <View >
            <Text style={[styles.text,{}]}>{weather ? getWeatherDescription(weather?.current?.weather_code) : ""}</Text>
            <Image
              source={getWeatherImage(weather?.current?.weather_code)}
              style={{ width: 150, height: 150  }}
            />
          </View>
          <View style={{flexDirection:"row", alignItems:"center", gap:1}}>
            <FontAwesome5 name="wind" size={16} color="#0e7fe2" />
            <Text style={[styles.text,{ }]}>{weather ? ` ${weather?.current?.wind_speed_10m}km/h` : ""}</Text>
          </View>        
        </View>
      }

    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"transparent",
    // backgroundColor: "#000000ff"
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
  },
  
  text:{
    fontSize:18,
    maxWidth:250,
    textAlign:"center",
    color:"white",
  },
  temperature:{ 
    padding:10,
    fontSize:30,
    color:"#F97316"
  },

  textWarning:{
    fontSize:20,
    color:"#FC2947"

  }
})

export default currently

