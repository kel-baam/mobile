import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import { signInWithGoogle, signInWithGitHub } from "../../services/supabaseAuth";

export default function Login() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleGoogle = async () => {
    setLoading("google");
    try {
      await signInWithGoogle();
    } catch (e: any) {
      Alert.alert("Google sign-in failed", e.message);
    } finally {
      setLoading(null);
    }
  };

  const handleGitHub = async () => {
    setLoading("github");
    try {
      await signInWithGitHub();
    } catch (e: any) {
      Alert.alert("GitHub sign-in failed", e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/diary-app/1.jpeg")}
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Welcome
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <BlurView intensity={70} tint="light" style={styles.blurContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleGoogle}
              disabled={loading !== null}
            >
              {loading === "google" ? (
                <ActivityIndicator color="black" />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/diary-app/google.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.buttonText}>Continue with Google</Text>
                </>
              )}
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={70} tint="light" style={styles.blurContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleGitHub}
              disabled={loading !== null}
            >
              {loading === "github" ? (
                <ActivityIndicator color="black" />
              ) : (
                <>
                  <AntDesign name="github" size={24} color="black" />
                  <Text style={styles.buttonText}>Continue with GitHub</Text>
                </>
              )}
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: 240,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  button: {
    padding: 20,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
});
