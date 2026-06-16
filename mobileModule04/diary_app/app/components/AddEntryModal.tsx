
import {Text,View,TouchableOpacity,FlatList,Modal,Alert,KeyboardAvoidingView, Platform,ScrollView } from "react-native";
import { TextInput } from 'react-native-paper';
import { EMOJI_MAP,emojiToText } from "../components/emojiToText";
import { addEntry } from "@/services/addEntry";

interface AddEntryModalProps {
  visible: boolean;
  onClose: () => void;
  fetchEntries: () => void;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newText: string;
  setNewText: (val: string) => void;
  newIcon: string;
  setNewIcon: (val: string) => void;
}
export function AddEntryModal({
visible,
  onClose,
  fetchEntries,
  newTitle,
  setNewTitle,
  newText,
  setNewText,
  newIcon,
  setNewIcon,
}: AddEntryModalProps
)
{
   
       return <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
            >
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
                >

            <View
                style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.45)",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: 16,
                        padding: 20,
                        // maxHeight: "90%",
                    }}
                >
                    {/* Emoji Selector */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled" 
                        >
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 25,
                            }}
                        >
                        
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#72243e", fontFamily: "Poppins" }}>
                                Add an Entry
                            </Text>

                            <TouchableOpacity
                            onPress={onClose}
                            style={{
                                backgroundColor: "#f4c0d1",
                                borderRadius: 20,
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            >
                            <Text style={{ fontSize: 12, color: "#72243e" }}>✕</Text>
                            </TouchableOpacity>
                        </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text
                            style={{
                            fontFamily: "Poppins",
                            fontSize: 13,
                            color: "#c9788a",
                            marginBottom: 6,
                            }}
                        >
                            How do you feel today?
                        </Text>

                        <View style={{ flexDirection: "row",flexWrap: "wrap", gap: 10 }}>
                            {Object.entries(EMOJI_MAP).map(([key, emoji]) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => newIcon!=key ?setNewIcon(key): setNewIcon("")}
                                style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                newIcon === key ? "#f4c0d1" : "#fff",
                                borderWidth: 1,
                                borderColor: "#f4c0d1",
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>{emoji}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                      {/* Title Input */}
                    <View>
                        <Text style={{ fontFamily: "Poppins", fontSize: 13, color: "#c9788a", marginBottom: 6 }}>
                            Title
                        </Text>
                        <TextInput
                            value={newTitle}
                            maxLength={20}
                            onChangeText={setNewTitle}
                            placeholder="Give your entry a title..."
                            placeholderTextColor="#d4a0b0"

                            mode="outlined"                        
                            outlineColor="#f4c0d1"
                            activeOutlineColor="#c9788a"
                            style={{
                            borderWidth: 1,
                            borderColor: "#f4c0d1",
                            borderRadius: 10,
                            
                            // padding: 12,
                            fontFamily: "Poppins",
                            fontSize: 14,
                            color: "#4b1528",
                            // marginBottom: 16,
                            }}
                        />

                    </View>
                    <View
                    style={{
                        paddingTop:10
                    }}
                    >
                        <Text style={{ fontFamily: "Poppins", fontSize: 13, color: "#c9788a", marginBottom: 6 }}>
                            How was your day?
                        </Text>
                        <TextInput
                            value={newText}
                            maxLength={500} // ← add this

                            onChangeText={setNewText}
                            placeholder="Write about your day..."
                            placeholderTextColor="#d4a0b0"
                            underlineColorAndroid="transparent" 
                            multiline
                            numberOfLines={4}

                            mode="outlined"                   

                            outlineColor="#f4c0d1"
                            activeOutlineColor="#c9788a"
                            
                            style={{
                            borderWidth: 1,
                            borderColor: "#f4c0d1",
                        
                            fontFamily: "Poppins",
                            fontSize: 14,
                            color: "#4b1528",
                            marginBottom: 24,
                            borderBottomWidth: 0,
                            height: 100,
                        
                            textAlignVertical: "top",
                            }}
                        />

                    </View>

                    {/* Add Button */}
                    <TouchableOpacity
                        onPress={async () => {
                              if (!newTitle.trim()) {
                                Alert.alert("Missing title", "Please give your entry a title.");
                                return;
                                }
                                if (!newText.trim()) {
                                Alert.alert("Missing content", "Please write something about your day.");
                                return;
                                }
                                if (!newIcon) {
                                Alert.alert("Missing mood", "Please select how you feel today.");
                                return;
                                }
                            await addEntry(newTitle, newText, newIcon, onClose, setNewTitle, setNewText,setNewIcon);
                            fetchEntries();
                        }}

                        style={{
                        backgroundColor: "#e6a9b5",
                        borderRadius: 10,
                        paddingVertical: 14,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 8,
                        }}
                    >
                        <Text style={{ fontFamily: "Poppins", fontSize: 15, fontWeight: "bold", color: "#72243e" }}>
                        Add Entry
                        </Text>
                    </TouchableOpacity>
                    </ScrollView>

                </View> 
            </View>
        </KeyboardAvoidingView>

        </Modal>
   
}