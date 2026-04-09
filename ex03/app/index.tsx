import { Text, View,TouchableOpacity,Alert} from "react-native";
import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");    // user input
  const [result, setResult] = useState("");  // calculation result


  const handlePress = (symbol:any) => {
  if (symbol === "C") {
    // Clear last character
    setInput(input.slice(0, -1));
  } else if (symbol === "AC") {
    // Clear everything
    setInput("");
    setResult("");
  } else if (symbol === "=") {
    try {
      // Evaluate the expression
      const evalResult = eval(input);  // ⚠ use with caution in real apps
      setResult(evalResult.toString());
    } catch (e) {
      setResult("Error");
    }
  } else {
    // Append symbol to input
    setInput(input + symbol);
  }
};
  const calculator = [
    ["7", "8", "9", "C","AC"],
    ["4", "5", "6", "+","-"],
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
          <Text style={{fontSize: 24,color: "#888",}}>{input}</Text>
          <Text style={{ fontSize: 55,color: "#fff",fontWeight: "bold",}} >{result}</Text>
      </View>
      <View style={{flex:3}}>
        {calculator.map((row, rowIndex) => (
          <View key={rowIndex} style={{flex:1,flexDirection: 'row', }}>
            {row.map((symbol, index) => (
              <TouchableOpacity key={index} style={{
                flex: 1,
              
                aspectRatio: 1,
                backgroundColor: "#E4DFB5",
                justifyContent: "center",
                alignItems: "center",
                // borderRadius: 5,
                // margin:10
                }}
                onPress={() => {
                  handlePress(symbol)
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

