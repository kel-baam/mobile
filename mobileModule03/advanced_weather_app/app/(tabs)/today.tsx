import React from 'react'
import { Text, View,StyleSheet,Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { getWeatherImage } from "../../utils/weatherPicture"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Chart } from '@/component/Chart';

const today = ({location,weather,permission,error,loading}:any) => {

  if (loading) {
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
            <Text style={[styles.text,{ color: '#0e7fe2' ,fontSize:28}]} >{permission?.city}</Text>
            <Text style={styles.text} >{permission?.state},{permission?.country}</Text>
            <ScrollView horizontal style={{ width:"100%"}}>
              <View style={{}}>
              < Chart  data={todayData}  mode="single"/>
              </View>
            </ScrollView>
            <ScrollView  horizontal   style={{ width: "100%", maxHeight: 150 }}
              contentContainerStyle={{ flexDirection: "row"}} >
              {todayData?.map((item:any, index:number) => ( 
                <View key={index} style={styles.weatherList}>
                  <Text style={styles.text}>{item.time.split("T")[1]}</Text>
                    <Image
                      source={getWeatherImage(weather?.current?.weather_code)}
                      style={{ width: 50, height: 50 }}
                    />
                  <Text style={styles.temperature}>{item.temperature}°C</Text>
                  <View style={{flexDirection:"row", alignItems:"center", gap:1}}>
                    <FontAwesome5 name="wind" size={16} color="white" />
                    <Text style={[styles.text,{ }]}>{weather ? ` ${weather?.current?.wind_speed_10m}km/h` : ""}</Text>
                  </View> 
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
            <Text style={[styles.text,{color: '#0e7fe2',fontSize:28}]} >{item ? `${item?.name},` : ""}</Text>
            <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" }</Text>
            <Text style={styles.text} >{item ?  `${item?.country}` : "" }</Text>
            <ScrollView horizontal style={{width:"100%" }}>
                <View style={{}}>
                  < Chart  data={todayData}  mode="single"/>
                </View>
            </ScrollView>
            <ScrollView horizontal style={{width:"100%", maxHeight: 150}} 
            contentContainerStyle={{ flexDirection: "row"}}
            >
              {todayData?.map((item:any, index:number) => ( 
                <View key={index} style={styles.weatherList}>
                  <Text style={styles.text}>{item.time.split("T")[1]}</Text>
                    <Image
                      source={getWeatherImage(weather?.current?.weather_code)}
                      style={{ width: 50, height: 50 }}
                    />
                  <Text style={styles.temperature}>{item.temperature}°C</Text>
                  <View style={{flexDirection:"row", alignItems:"center", gap:1}}>
                    <FontAwesome5 name="wind" size={16} color="white" />
                    <Text style={[styles.text,{ }]}>{weather ? ` ${weather?.current?.wind_speed_10m}km/h` : ""}</Text>
                  </View> 
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
    fontSize:18,
    maxWidth:250,
    textAlign:"center",
    color:"white",
  },
  temperature:{ 
    padding:10,
    fontSize:20,
    color:"#F97316"
  },
  textWarning:{
    fontSize:20,
    color:"#FC2947"
  },
  weatherList:{
    flexDirection:"column",
    alignItems:"center",
    padding:8,

  },
 
})

export default today
