import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface topBarPropsType{
  handleLogout: () => void;
  name:string;
  picture:string | null
}

export default function TopBar({ handleLogout ,name,picture}:topBarPropsType) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#72243e22",
        borderWidth: 2,
        borderColor: "#72243e",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>  
          <Image
            source={picture ? { uri: picture }   :require("../../assets/images/diary-app/profile1.jpeg")}
            style={{
              width: 140,
              height: 140,
              borderRadius: "100%",
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 12,
                color: "#aa2f7bff",
                letterSpacing: 1,
                fontWeight:"600",
                textTransform: "uppercase",
              }}
            >
              Welcome back
            </Text>

            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: "#1a1a1a",
              }}
            >
            {name?.slice(0,12)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "rgba(114,36,62,0.1)",
          borderRadius: 20,
          padding: 9,
          borderWidth: 1,
          borderColor: "rgba(114,36,62,0.2)",
        }}
      >
        <MaterialCommunityIcons name="logout" size={22} color="#72243e" />
      </TouchableOpacity>
    </View>
  );
}