import React from 'react'
import { Text, View,StyleSheet } from "react-native";

const today = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
            TODAY
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:"100%",
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:30,
    fontWeight:"bold"

  }
})

export default today
