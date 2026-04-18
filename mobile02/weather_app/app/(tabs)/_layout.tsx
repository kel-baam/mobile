import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Currently from "./currently";
import Today from "./today";
import Weekly from "./weekly";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

import { View,TextInput,TouchableOpacity,StyleSheet, Alert,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();

// getCoords
// getWeather
// 
// my location serach location 



function TopBar({location,setLocation,search, setSearch,setErrMsg,weather,setWeather}:any) {
  // const [c]
  const getCoords = async ()=>{
    const coords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5`)
    const result = await coords.json()
    setLocation(result.results)
    // console.log("====>",result.results)
    return result.results;
  }
  const getWeather = async()=>{
    const item = location[0];
    // const weather=await fetch(`https://api.open-meteo.com/v1/forecast
    //       ?latitude=${item.latitude}
    //       &longitude=${item.longitude}&current=temperature_2m,weather_code,wind_speed_10m`)
    // const data = await weather.json(); 
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${item?.latitude}&longitude=${item?.longitude}&current=temperature_2m,weather_code,wind_speed_10m&current=temperature_2m,weather_code,wind_speed_10m`)
    const data = await weather.json(); // ✅ IMPORTANT
    setWeather(data)
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrMsg?.("please give me permission");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    setLocation(
      `${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`
    );
  };
   useEffect(
    ()=>
      {
        getCurrentLocation()
      },[]
  )
  return (
    <View style={styles.container}>
      <View style={styles.serachContiner}>

      <View style={{paddingHorizontal:20,gap:5, flexDirection:"row" ,justifyContent:"center",alignItems:"center",backgroundColor:"#3674B5",width:"80%"}}>
        <Feather name="search" size={20} color="#fff" />
        <TextInput 
          focusable={false}

          style={styles.search}
          placeholder="Search location"
          value={search}
          onChangeText={(text)=>{
            setSearch(text)
            getCoords()
          }}
        >
      </TextInput>
    </View>
    {search.length > 2 && (
        <View style={styles.resultsContainer}>

          {Array.isArray(location) &&
            location.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.resultItem}
                onPress={() => {
                  setSearch(item.name);
                  setLocation([item]);
                  getWeather()
                }}
              >
                <Text style={styles.resultText}>
                  {item.name}, {item.admin1 || item.admin2},{item.country}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        )}
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={()=>{
          getCurrentLocation()
          setSearch("")
      }}>
        <FontAwesome name="location-arrow" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


export default function AppBar() {
  const [location,setLocation] = useState(null)
  const [search,setSearch] = useState("")
  const [weather,setWeather] = useState("")

  const [errMsg,setErrMsg] = useState("")


  return (
  <SafeAreaView style={{ flex: 1 }}>
    <TopBar  location={location} setLocation={setLocation} search={search} setSearch={setSearch} setErrMsg={setErrMsg} weather={weather}
    setWeather={setWeather}/>      
    <Tab.Navigator initialRouteName="currently" tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: true,
        }}
    >
      <Tab.Screen
        name='currently'
        options={{
        title:"Currently",
        tabBarIcon: ({ color  }) => (
            <Ionicons name="partly-sunny" size={20} color={color} />
          ),
        }}
      >
        {() => <Currently location={location} search={search} errMsg={errMsg} weather={weather}/>}

      </Tab.Screen>
      <Tab.Screen
        name='today'
        options={{
        title:"Today",
        tabBarIcon: ({ color }) => (
            <Ionicons name="today" size={20} color={color} />
        ),
        }}
      >
        {() => <Today location={location} search={search} errMsg={errMsg}/>}
      </Tab.Screen>
      <Tab.Screen
        name='weekly'
        options={{
        title:"Weekly",
        tabBarIcon: ({ color}) => (
            <Ionicons name="calendar-outline" size={20} color={color} />
        ),   
        }}
      >
        {() => <Weekly location={location}  search={search} errMsg={errMsg}/>}

      </Tab.Screen>
    </Tab.Navigator>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor:"#3674B5",
    paddingHorizontal:10,
    justifyContent: "space-between",
  },
  serachContiner:
  {
    // flexDirection:"column"
    flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#3674B5",
  paddingHorizontal: 10,
  borderRadius: 10,
  },
  search: {
    height: 40,
    width:"100%",
    backgroundColor: "#3674B5",
    borderRadius: 10,
    paddingHorizontal:5,
    color:"#b3afafff",
    fontSize: 14
  },

  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
  position: "absolute",
  top: 50,
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 10,
  elevation: 5,
  zIndex: 100,
},

resultItem: {
  padding: 10,
  borderBottomWidth: 0.5,
  borderColor: "#ccc",
},

resultText: {
  fontSize: 14,
  color: "#333",
},
});