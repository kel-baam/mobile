import { Text, View,TouchableOpacity,StyleSheet} from "react-native";
import { useState } from "react";

export default function Calculator() {

  const calculator = [
    ["7", "8", "9", "C","AC"],
    ["4", "5", "6", "+","."],
    ["1", "2", "3", "*","/"],
    ["0", ".", "00", "=",""]
]
  return (
   

    <View style={{flex:1, height:'100%',backgroundColor:"#FBE8CE"}}>
      <View style={{ flex: 2,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 20
      }}>
          <Text style={{fontSize: 24,color: "#888",}}>0</Text>
          <Text style={{ fontSize: 55,color: "#fff",fontWeight: "bold",}} >0</Text>
      </View>
      <View style={{flex:3}}>
        {calculator.map((row, rowIndex) => (
          <View key={rowIndex} style={{flex:1,flexDirection: 'row', }}>
            {row.map((symbol, index) => (
              <TouchableOpacity key={index} style={{
                flex: 1,
                backgroundColor: "#E4DFB5",
                justifyContent: "center",
                alignItems: "center",
                }}
                onPress={() => {
                  console.log("button pressed :",symbol)
                }}
                >
                <Text style={{ fontSize: 22, color: "#000000", fontWeight: "600",}}>{symbol}</Text>
            </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

