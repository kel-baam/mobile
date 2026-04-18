import React from 'react'
import { Text, View,StyleSheet } from "react-native";

const today = ({location,search,errMsg}:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
            {/* {errMsg? errMsg: location? location : search} Today */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:30,
    fontWeight:"bold",
    maxWidth:200,


  }
})

export default today
