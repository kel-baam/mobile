import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Currently from "./currently";
import Today from "./today";
import Weekly from "./weekly";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import { View,TextInput,TouchableOpacity,StyleSheet,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {getCoords,getWeather} from "../services/weatherApi"
import {getCurrentLocation} from "../services/locationApi"
import { getCityFromCoords } from "../services/locationApi";
const Tab = createMaterialTopTabNavigator();



function TopBar({setLocation,search, setSearch,setPermission,setWeather,setError}:any) {
    const [suggestionLocation,useSuggestionLocation] = useState(null)
    
    const getPermission = async()=>
      {
        
        const permission =  await getCurrentLocation()
        if(permission)
          {
            const weather = await getWeather(permission?.latitude,permission?.longitude,setError)
            setWeather(weather)
            setLocation("")
            setSearch("")
            const locationInfo = await getCityFromCoords(permission.latitude,permission.longitude,setError)
            setPermission(locationInfo)
            return;
          }
        }
        
   useEffect(()=>
      {
        getPermission()

      },[])

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#fff" />
        <TextInput 
          style={styles.search}
          placeholder="Search for location"
          value={search}
          onSubmitEditing={async()=>{
            const coords = await getCoords(search,setError)
               if (!coords || coords.length === 0) {
              useSuggestionLocation(null)
              setError("❌ City not found. Try another name.")
            } else {
          
             const weather = await getWeather(coords[0].latitude,coords[0].longitude,setError)
                setPermission("")
                setError("")
                setSearch("")
                setLocation(coords[0])
                setWeather(weather)
            }
          }}
          onChangeText={async (text)=>{
            setSearch(text)
            const coords = await getCoords(search,setError)
            if (!coords || coords.length === 0) {
              useSuggestionLocation(null)
            } else {
          
              useSuggestionLocation(coords)
            }
          }}
        />
      </View>
    {search.length > 0 && (
        <View style={styles.resultsContainer}>
          {
            suggestionLocation?.map((item: any,index:number) => (
              <TouchableOpacity
                key={item.id}
                style={styles.resultItem}
                
                onPress={async () => {
                  setSearch(item.name);
                  setPermission("")
                  setSearch("");
                  setError("")
                  setLocation([item]);
                  const weather = await getWeather(suggestionLocation[index]?.latitude,suggestionLocation[index]?.longitude,setError)
                  setWeather(weather)
                }}
              >
                <Text style={styles.resultText}>
                  {item.name}, {item.admin1 || item.admin2},{item.country}
                </Text>
              </TouchableOpacity>
            ))
            
          }
            
        </View>
        )}
      <TouchableOpacity style={styles.iconButton} onPress={()=>{
        getPermission()
        setLocation("")
        setError("")
        setSearch("");

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
  const [permission,setPermission] = useState("")
  const [error, setError] = useState(null);


  return (
  <SafeAreaView style={{ flex: 1 }}>
    <TopBar setLocation={setLocation} search={search} setSearch={setSearch} setPermission={setPermission} setWeather={setWeather} setError={setError}/>      
    <Tab.Navigator 
        initialRouteName="currently" 
        tabBarPosition="bottom"
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
        {() => <Currently location={location}   weather={weather} permission={permission} error={error} />}

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
        {() => <Today location={location} weather={weather} permission={permission} error={error}/>}
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
        {() => <Weekly location={location}  weather={weather} permission={permission} error={error}/>}

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

  searchContainer:{
    paddingHorizontal:20,
    gap:5,
    justifyContent:"center",
    width:"80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3674B5",
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
    width: "60%",
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