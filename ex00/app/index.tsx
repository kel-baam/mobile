import { Text, View,TouchableOpacity,StyleSheet} from "react-native";

export default function Index() {
  return (
    <View style={[ styles.container,]}>
      <Text style={{fontSize:30 ,padding:10,borderRadius:8, backgroundColor:"#6375EB", color:"#F5ECD3"}}>
        A SIMPLE TEXT
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => console.log("Button pressed")}
      >
        <Text style={styles.text}>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  button:{
      marginTop:8,
      backgroundColor:"#F5ECD3",
      fontSize:20,
      padding:14,
      borderRadius:8,
  },
  text:{
      color:"#6375EB",
      fontSize:25,
  }
})
