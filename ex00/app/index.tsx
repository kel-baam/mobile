import { Text, View,Button,StyleSheet} from "react-native";
import { useState } from "react";

export default function Index() {
  return (
    <View
      style={[
        
        styles.container,
       
        
      ]
      }
    >
      <Text>
        A SIMPLE TEXT
      </Text>
      <Button title="Click me"

      onPress={()=>
        {
          console.log("Button pressed")
        }
      }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full height
    justifyContent: "center",
    // cal center
    alignItems: "center", // horizontal center
    padding: 16, // responsive padding
  },

})
