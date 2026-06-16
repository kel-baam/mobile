import { ImageBackground, Text,View,TouchableOpacity,FlatList} from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/services/supabaseConfig";
import { EMOJI_MAP,emojiToText } from "../components/emojiToText";
import { Note } from "../types/Note";
import { formatDate } from "../utils/formatDate";
import { AddEntryModal } from "../components/AddEntryModal";
import { ViewEntryModal } from "../components/ViewEntryModal";
import { handleLogout } from "@/services/logout";


export default function HomeScreen() {
    const [visible, setVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newText, setNewText] = useState("");
    const [newIcon, setNewIcon] = useState("");
    const [entries, setEntries] = useState<Note[]>([]);
    const [selectedEntry, setSelectedEntry] =useState<Note | null>(null);

    const fetchEntries = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.log("No user logged in");
          return;
        }

        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.log("Fetch error:", error.message);
          return;
        }

        setEntries(data);
      } catch (err) {
        console.log("Unexpected error:", err);
      }
    };
    useEffect(() => {

        fetchEntries();
    },
    []);



  return (

     <ImageBackground source={require("../../assets/images/diary-app/1.jpeg")}        
         resizeMode="cover"
         style={{
           flex: 1,
           width: "100%",
           height: "100%",
        //    padding:10,
         }}
   
        >
        <SafeAreaView
            style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent:"center",}}
        >
        <ViewEntryModal
        visible={visible}
        setVisible={setVisible}
        selectedEntry={selectedEntry}
        fetchEntries={fetchEntries}
        />
            <View
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent:"center",
                alignItems:"center",        
                gap:10
            }}
            >  
            <View
            style={{
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
                
            }}
            >
                    <Text style={{
                            fontSize: 24, 
                            fontWeight: "bold",
                            fontFamily:"lemon",
                            maxWidth:300,
                            paddingTop:10,
                            textAlign:"center",
                            color: "#c9788a" 
                        }}>
                            Your last diary entries
                    </Text>
                    
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
                <FlatList
                style={{
                        borderRadius:10,
                        padding:20,
                        width: "100%",
                    }}
                        ItemSeparatorComponent={() => (
                                <View style={{ 
                                    backgroundColor: "#c9788a",
                                    height: 1,
                                    marginVertical: 12 
                                }} />
                            )}
                        ListEmptyComponent={() => (
                            <View style={{ alignItems: "center", marginTop: 40 }}>
                            <Text style={{ fontFamily: "Poppins", fontSize: 14, color: "#c9788a" }}>
                                No entries yet. Start writing! 🌸
                            </Text>
                            </View>
                        )}
                        data={entries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <View style={{
                            flex:1,
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            }}>
                        
                                <TouchableOpacity
                                        style={{
                                        flex:1,
                                        flexDirection:"row",
                                        alignItems:"center",
                                        gap:10,
                                        
                                    }}
                                    onPress={()=>{
                                        setSelectedEntry(item)
                                        setVisible(true)
                                    }}
                                >
                                    <Text style={{ fontSize: 40 }}>{emojiToText(item.icon)}</Text>

                                    <Text
                                        style={{
                                            fontFamily:"Poppins",
                                            fontSize:12,
                                        }}
                                    >
                                        {item.title}
                                    </Text>

                                </TouchableOpacity>

                            <Text
                            style={{
                                fontSize:18
                            }}
                            >{formatDate(item.date)}</Text>
                        </View>
                    )}
                >
                
                </FlatList>
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