import { View ,Text} from "react-native";
import { ImageBackground } from "react-native";

export default function Calendar()
{
    return(
        <ImageBackground source={require("../../assets/images/diary-app/1.jpeg")}        
                resizeMode="cover"
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent:"center",
                  alignItems:"center"
                  
                }}
          
               >
            <Text
            style={{
                fontSize:20,
                
            }}
            >Not available</Text>
        </ImageBackground>
    )
}