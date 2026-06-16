import { ImageBackground, Text,View,TouchableOpacity,FlatList,Modal,Alert } from "react-native";
import { Note } from "../types/Note";
import { emojiToText } from "../utils/emojiToText";
import { formatDate } from "../utils/formatDate";

interface EntriesListType{
    data: Note[];
    setSelectedEntry: (entry: Note | null) => void;
    setVisible: (val: boolean) => void;
}

export function EntriesList(
{ 
    data,
    setSelectedEntry,
    setVisible,
 }:
 EntriesListType
)
{
    return(
        <View
            style={{
                marginTop: 10,
                borderRadius: 20,
                gap: 12,                
            }}
        >
            <FlatList
                style={{ maxHeight: 280 }}
                ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: "#c9788a", height: 1, marginVertical: 8, opacity: 0.4 }} />
                )}
                ListEmptyComponent={() => (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontFamily: "Poppins", fontSize: 14, color: "#c9788a" }}>
                    No entries yet. Start writing! 🌸
                    </Text>
                </View>
                )}
                
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        setSelectedEntry(item)
                        setVisible(true)
                    }}
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#bb285930",
                    borderRadius: 10,
                    padding: 10,
                    gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 30 }}>{emojiToText(item.icon)}</Text>
                    <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Poppins", fontSize: 13, fontWeight: "bold", color: "#72243e" }}>
                        {item.title}
                    </Text>
                  
                    </View>
                    <Text style={{ fontFamily: "Poppins", fontSize: 16, color: "#c55e81ff" }}>
                    {formatDate(item.date)}
                   
                    </Text>
                </TouchableOpacity>
                )}
            />
            </View>
    )
}