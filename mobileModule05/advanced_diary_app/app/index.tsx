


import { TouchableOpacity, View ,Text,ImageBackground,StyleSheet} from 'react-native';
import { useFonts} from "@expo-google-fonts/poppins";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

export default function LoginScreen() {

  const [fontsLoaded] = useFonts({
   Lemon: require("../assets/fonts/Lemon-Regular.ttf"),
   Poppins: require("../assets/fonts/Poppins-Regular.ttf"),

  });

  if (!fontsLoaded) return null;
 
  return (
    <ImageBackground source={require("../assets/images/diary-app/1.jpeg")}        
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >

      <View style={{
         width: "100%",
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "50%",
        }}
      >
        <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#f591a5ff",
          fontFamily: "Lemon",
          marginBottom: 20,
          textAlign: "center",
          maxWidth:250
        }}
        >
          Welcome to you Diary App 
        </Text>
        <BlurView intensity={70} tint="light" style={styles.blurContainer}>
          
            <TouchableOpacity
              style={{
                width:150,
              
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 10,
                alignItems: "center",
                
              }}
                onPress={() => router.push("/auth/login")}

            >
              <Text style={{ color: "#3A3A3A", fontSize: 20, fontWeight: "600",fontFamily:"Poppins" }}>
                Login
              </Text>
            </TouchableOpacity>


        </BlurView>
      </View>
      
    </ImageBackground>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  blurContainer: {
    width: 200,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",

  },

  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
});