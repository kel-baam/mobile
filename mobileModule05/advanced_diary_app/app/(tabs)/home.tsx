import { ImageBackground, Text,View,TouchableOpacity,ScrollView,ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/services/supabaseConfig";
import {emojiToText } from "../utils/emojiToText";
import { handleLogout } from "@/services/logout";
import { IconStat } from "../types/IconStat";
import { EntriesList } from "../components/EntriesList";
import TopBar from "../components/top-bar";
import { getIconStats } from "../utils/getIconsState";
import { AddEntryModal } from "../components/AddEntryModal";
import { ViewEntryModal } from "../components/ViewEntryModal";
import { Note } from "../types/Note";
import { User } from "@supabase/supabase-js";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function HomeScreen() {
    const [visible, setVisible] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<User | null>(null);;
    const [iconStats, setIconStats] = useState<IconStat[]>([]);
    const [entries, setEntries] = useState<Note[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newText, setNewText] = useState("");
    const [newIcon, setNewIcon] = useState("");
    const [selectedEntry, setSelectedEntry] =useState<Note | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchEntries = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            console.log("No user logged in");
            return;
        }
        setUserData(user)

        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.log("Fetch error:", error.message);
          return;
        }
        
        setEntries(data);
        setIconStats(getIconStats(data))

      } catch (err) {
        console.log("Unexpected error:", err);
      }
      finally {
      setLoading(false);
    }
    };
    useFocusEffect(
    useCallback(() => {
        fetchEntries();
        }, [])
    );


  return (

     <ImageBackground source={require("../../assets/images/diary-app/1.jpeg")}        
         resizeMode="cover"
         style={{
           flex: 1,
           width: "100%",
           height: "100%",
         }}
   
        >
            <SafeAreaView   
                style={{
                flex: 1,
                width: "100%",
                height: "100%",
                padding:6
            }}
            >
                <ViewEntryModal
                    visible={visible}
                    setVisible={setVisible}
                    selectedEntry={selectedEntry}
                    fetchEntries={fetchEntries}
                />
                <TopBar handleLogout={handleLogout} name={userData?.user_metadata?.name} picture={userData?.user_metadata?.avatar_url}/>
                <View
                style={{
                     backgroundColor: "#a3174622",
                        marginTop: 10,
                        borderRadius: 20,
                        borderColor: "#72243e",
                        borderWidth:2,
                        padding: 16,
                        gap:20,
                }}
                >
                    <View style={{
                        width:"100%",
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a", marginBottom: 12 }}>
                            Your last diary entries
                        </Text>
                        
                     {loading ? 
                        (
                            <View style={{ alignItems: "center", gap: 10 }}>
                                <ActivityIndicator size="large" color="#72243e" />
                                <Text
                                    style={{
                                    fontFamily: "Poppins",
                                    fontSize: 13,
                                    color: "#c9788a",
                                }}
                                >
                                    Loading your entries... 🌸
                                </Text>
                            </View>
                        ) :
                        (
                            < EntriesList 
                                data={entries.slice(0, 2)} 
                                setSelectedEntry={setSelectedEntry}
                                setVisible={setVisible} 
                            />           
                        )
                    }
                    </View>
                    <View style={{
                        gap:5,

                    }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a", marginBottom: 12 }}>
                                Your feel for you {entries.length} entries
                            </Text>
                        </View>
                        <View
                        >
                            <ScrollView
                            style={{
                            maxHeight:230
                            }}
                             showsVerticalScrollIndicator={false}
                            >
                                {iconStats.map((item) => (
                                    <View key={item.icon} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, gap:10 }}>
                                    
                                        <Text style={{ fontSize: 30, width: 30 }}>{emojiToText(item.icon)}</Text>
                                        <Text style={{  width: 70, fontSize: 13, color: "#444" }}>{item.icon}</Text>
                                        <View style={{ flex: 1, height: 8, backgroundColor: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                                            <View style={{ width: `${item.pct}%`, height: 8, backgroundColor: "#72243e", borderRadius: 4 }} />
                                        </View>
                                        <Text style={{ fontSize: 12, fontWeight: "700", color: "#72243e", width: 48 }}>
                                            {item.pct}%
                                        </Text>

                                    </View>
                                ))}

                            </ScrollView>
                        </View>
                      </View>
                </View>
                <TouchableOpacity
                    onPress={() => setFormVisible(true)}
                    style={{
                    position: "absolute",
                    bottom:5,
                    right: 20,
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    backgroundColor: "#e6a9b5",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#72243e",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 8,
                    }}
                >

                <MaterialCommunityIcons name="pencil" size={20} color="#72243e" />
                </TouchableOpacity>
                 <AddEntryModal
                    visible={formVisible}
                    onClose={() => setFormVisible(false)}
                    fetchEntries={fetchEntries}
                    newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    newText={newText}
                    setNewText={setNewText}
                    newIcon={newIcon}
                    setNewIcon={setNewIcon}
            />

            </SafeAreaView>
    </ImageBackground>
  );
}