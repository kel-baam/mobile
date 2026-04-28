import React from 'react'
import { Text, View,StyleSheet,Dimensions } from "react-native";
import { ScrollView } from "react-native";
import {getWeatherDescription} from "../utils/weatherCode"
import { LineChart } from "react-native-chart-kit";
import { Image } from "react-native";
import { getWeatherImage } from "../utils/weatherPicture"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const Chart = ({data}:any) => {
const screenWidth  = data.length * 40 || Dimensions.get("window").width

  return (<View style={styles.container }>
    <LineChart
    data={{
      labels:data.map((item:any) => item.time.split("T")[1]),
      datasets:[
        {
          data:data.map((item:any) => item.temperature)
        }
      ]
    }}
    width={screenWidth} // ✅ REQUIRED

    height={220}
    yAxisLabel=""
    yAxisSuffix="°C"
    yAxisInterval={1} 
    chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#1e2923",
          backgroundGradientTo: "#08130d",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "1",
                strokeWidth: "3",
                stroke: "#fff",
              },
            

        }}
        bezier

    >

    </LineChart>

  </View>)

}
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
              <ScrollView horizontal style={{width:"100%",flexDirection:"column", }}>
                <View style={{alignItems:"center",justifyContent:"center",minWidth:"100%"
                  
                }}>
                < Chart  data={todayData} />
                </View>
              </ScrollView>
              <ScrollView horizontal style={{width:"100%",flexDirection:"column", gap:6}}>
                    {todayData?.map((item:any, index:number) => ( 
                      <View style={styles.weatherList}>
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
            <ScrollView horizontal style={{width:"100%",flexDirection:"column", }}>
                <View style={{alignItems:"center",justifyContent:"center",minWidth:"100%"}}>
                  < Chart  data={todayData} />
                </View>
            </ScrollView>
            <ScrollView horizontal style={{width:"100%",flexDirection:"column"}}>
                    {todayData?.map((item:any, index:number) => ( 
                      <View style={styles.weatherList}>
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
