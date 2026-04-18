import React from 'react'
import { Text, View,StyleSheet } from "react-native";


const weekly = ({location,search,errMsg}:any) => {
  return (
  <View style={styles.container}>
        <Text style={styles.text}>
             {/* {errMsg? errMsg: location? location : search} Weekly */}
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
    fontWeight:"bold",
    maxWidth:200,
  }
})

export default weekly