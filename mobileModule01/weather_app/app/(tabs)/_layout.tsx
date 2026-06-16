import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Currently from "./currently";
import Today from "./today";
import Weekly from "./weekly";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { View,TextInput,TouchableOpacity,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();



function TopBar({setLocation,search, setSearch}:any) {
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal:20,gap:5, flexDirection:"row" ,justifyContent:"center",alignItems:"center",backgroundColor:"#3674B5",width:"80%"}}>
      <Feather name="search" size={20} color="#fff" />
      <TextInput
        focusable={false}

        style={styles.search}
        placeholder="Search location"
        value={search}
        onChangeText={(text)=>{
          setSearch(text)
          setLocation("")
        }}
      >
      </TextInput>

      </View>
      <TouchableOpacity style={styles.iconButton} onPress={()=>{
          setLocation("Geolocation")
          setSearch("")
      }}>
        <FontAwesome name="location-arrow" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


export default function AppBar() {
  const [location,setLocation] = useState("")
  const [search,setSearch] = useState("")


  return (
  <SafeAreaView style={{ flex: 1 }}>
    <TopBar setLocation={setLocation} search={search} setSearch={setSearch} />      
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
        {() => <Currently location={location} search={search} />}

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
        {() => <Today location={location} search={search} />}
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
        {() => <Weekly location={location}  search={search} />}

      </Tab.Screen>
    </Tab.Navigator>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor:"#3674B5",
    paddingHorizontal:10,
    justifyContent: "space-between",
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
});