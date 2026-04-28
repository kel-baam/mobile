import React from 'react'
import { Text, View,StyleSheet,Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { getWeatherDescription } from '../utils/weatherCode';
import { LineChart } from "react-native-chart-kit";
import { ImageBackground } from "react-native";
import { Image } from "react-native";
import { getWeatherImage } from "../utils/weatherPicture";

const Chart = ({data}:any) => {
const screenWidth  = data.length * 40 || Dimensions.get("window").width

  return (<View style={styles.container }>
    <LineChart
    data={{
      labels:data.map((item:any) => item.time),
     datasets: [
      {
        data: data.map((item: any) => item.temperature_2m_max),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // 🔴 max (red)
        strokeWidth: 2,
      },
      {
        data: data.map((item: any) => item.temperature_2m_min),
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // 🔵 min (blue)
        strokeWidth: 2,
      },
    ],
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
const weekly = ({location,weather,permission,error,loading}:any) => {
const item = Array.isArray(location) ? location[0] : location;
  



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
const formatDate = (time:string) => {
  const [, month, day] = time.split("-");
  return `${month}-${day}`;
};
  const weeklyData = weather?.daily?.time?.map((time:string, index:number)=>({
    time: formatDate(time),
    temperature_2m_min:  weather?.daily?.temperature_2m_min[index],
    temperature_2m_max:  weather?.daily?.temperature_2m_max[index],
    code:  weather?.daily?.weather_code[index],
    
       
    }))

  return (
  <View style={styles.container}>

    {
      permission ?
        <View  style={{flex:1,alignContent:"center",justifyContent:"center",width:"100%"}} >
          <Text style={[styles.text, { color: '#0e7fe2',fontSize:28 }]} >{permission?.city}</Text>
          <Text style={styles.text} >{permission?.state},{permission?.country}</Text>
          <ScrollView horizontal style={{width:"100%",flexDirection:"column", }}>
            <View style={{alignItems:"center",justifyContent:"center",minWidth:"100%"}}>
              < Chart  data={weeklyData} />
            </View>
          </ScrollView>
          <ScrollView horizontal style={{width:"100%",flexDirection:"column"}}>
                {weeklyData?.map((item:any, index:number) => ( 
                  <View style={styles.weatherList}>
                    <Text style={styles.text}>{item.time}</Text>
                      <Image
                        source={getWeatherImage(weather?.current?.weather_code)}
                        style={{ width: 50, height: 50 }}
                      />
                    <Text style={styles.temperature_max}>{item.temperature_2m_max}°C <span style={{fontSize:12}} >max</span></Text>
                    <Text style={styles.temperature_min}>{item.temperature_2m_min}°C  <span style={{fontSize:12}} >min</span></Text>
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
        <Text style={[styles.text,{ color: '#0e7fe2',fontSize:28 }]} >{item ? `${item?.name},` : ""}</Text>
        <Text style={styles.text} >{item ? `${item?.admin1 || item?.admin2},` : "" },{item ?  `${item?.country}` : "" }</Text>
        <ScrollView horizontal style={{width:"100%",flexDirection:"column"}}>
            <View style={{alignItems:"center",justifyContent:"center",minWidth:"100%"}}>
              < Chart  data={weeklyData} />
            </View>
        </ScrollView>
        <ScrollView horizontal style={{width:"100%",flexDirection:"column" }}>
          {weeklyData?.map((item:any, index:number) => ( 
            <View style={styles.weatherList}>
              <Text style={styles.text}>{item.time}</Text>
                <Image
                  source={getWeatherImage(weather?.current?.weather_code)}
                  style={{ width: 50, height: 50 }}
                />
              <Text style={styles.temperature_max}>{item.temperature_2m_max} °C <span style={{fontSize:12}} >max</span></Text>
              <Text style={styles.temperature_min}>{item.temperature_2m_min}°C <span style={{fontSize:12}} >min</span></Text>
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
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    padding:8
   
  },
 text:{
    fontSize:18,
    textAlign:"center",
    color:"white",
    width:"100%",
  },
  temperature_max:{ 
    fontSize:20,
    color:"#F97316"
  },
  temperature_min:{
    color:"#0e7fe2",
    fontSize:20,

  },
  textWarning:{
    fontSize:20,
    color:"#FC2947"
  }
  ,
   weatherList:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:8,

  }
})

export default weekly