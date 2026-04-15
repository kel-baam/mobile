import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Currently from "./currently";
import Today from "./today";
import Weekly from "./weekly";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


import { View,TextInput,TouchableOpacity,StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();



function Header() {
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal:20,gap:5, flexDirection:"row" ,justifyContent:"center",alignItems:"center",backgroundColor:"#3674B5",width:"80%"}}>
      <Feather name="search" size={20} color="#fff" />
      <TextInput
        style={styles.search}
        placeholder="Search location"
      >

      </TextInput>

      </View>
      <TouchableOpacity style={styles.iconButton}>

        {/* <Ionicons name="location" size={22} color="#4FACFE" /> */}
        <FontAwesome name="location-arrow" size={24} color="#4FACFE" />
      </TouchableOpacity>
    </View>
  );
}


export default function AppBar() {
  return (
  <SafeAreaView style={{ flex: 1 }}>
    <Header/>


    <Tab.Navigator initialRouteName="currently" tabBarPosition="bottom"
      
      screenOptions={{
        swipeEnabled: true,
        
      }}
    >
      <Tab.Screen
      name='currently'
      component={Currently}

      options={{
        title:"Currently",
        
        tabBarIcon: ({ color  }) => (
            <Ionicons name="partly-sunny" size={20} color={color} />
          ),
      }}
      />
       <Tab.Screen
      name='today'
       component={Today}
      options={{
        title:"Today",

        tabBarIcon: ({ color }) => (
            <Ionicons name="today" size={20} color={color} />
          ),
      
      }}
      />
       <Tab.Screen
      name='weekly'
       component={Weekly}

      options={{
        title:"Weekly",

        tabBarIcon: ({ color}) => (
            <Ionicons name="calendar-outline" size={20} color={color} />
          ),
      
      }}
      />
    </Tab.Navigator>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor:"#3674B5",
    // gap: 10,
    paddingHorizontal:10,

    justifyContent: "space-between",

    // borderWidth:2,

  },

  search: {
    // flex: 1,
    // borderWidth:1,
    height: 40,
    width:"100%",
    backgroundColor: "#3674B5",
    borderRadius: 10,
    paddingHorizontal:5,
    // paddingHorizontal: 10,
    color:"#b3afafff",
    fontSize: 14,
     borderWidth: 0,  
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
});