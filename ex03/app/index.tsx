import { Text, View,TouchableOpacity,Alert} from "react-native";
import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState(""); 
  const [expression, setExpression] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);

  const operators = ["+", "-", "*", "/"];
  const handlePress = (symbol:any) => {
    if(input ==="Error")
        setInput("")
  if (symbol === "C") {

    if (input.length > 0 && !expression) {
      setInput(input.slice(0, -1));
    }
  } else if (symbol === "AC") {

    setInput("");
    setExpression("")
  } else if (symbol === "=") {
    try {
      const evalResult = eval(input); 
      setInput(evalResult.toString())
      setExpression(input)
      setJustCalculated(true)


    } catch (e) {
      setInput("Error");
      setExpression("")

    }
  }
  else {
    if(operators.includes(symbol))
    {
      setExpression("")

    }
    else
    {
      if(justCalculated)
      {
        setInput("");
        setExpression("")
      }
    }
    
    setJustCalculated(false)
    setInput(prev => prev + symbol);
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
            padding: 15,
        }}>
          <Text 
            style={{fontSize: 24,color: "#888"}}>{expression}</Text>
          <Text 
           
          style={{  fontSize: 55,color: "#fff",fontWeight: "bold"}} >{input ? input : 0}</Text>
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

