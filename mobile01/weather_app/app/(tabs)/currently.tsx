import React from 'react'
import { Text, View,StyleSheet } from "react-native";


const currently = ({location}:any) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
               {location} currently
        </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:30,
    fontWeight:"bold"

  }
})

export default currently
