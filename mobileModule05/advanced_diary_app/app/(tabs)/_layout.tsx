import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs 
     screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f48fb1",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
        },
      }}
    
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Profile",
           tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Agenda",
           tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}