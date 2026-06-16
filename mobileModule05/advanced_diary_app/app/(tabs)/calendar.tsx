import { Calendar } from "react-native-calendars";
import { ImageBackground,View,ActivityIndicator,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EntriesList } from "../components/EntriesList";
import { useEffect, useState } from "react";
import { Note } from "../types/Note";
import { supabase } from "@/services/supabaseConfig";
import { ViewEntryModal } from "../components/ViewEntryModal";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Agenda()
{
    const [selectedEntry, setSelectedEntry] =useState<Note | null>(null);
    const [visible, setVisible] = useState(false);
    const [entries, setEntries] = useState<Note[]>([]);
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [loading, setLoading] = useState(true);

    

    const fetchEntries = async () => {
        try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            console.log("No user logged in");
            return;
        }

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

    const filteredEntries = entries.filter((entry) => 
    entry.created_at.split("T")[0] === selectedDate
    );

    const markedDates = entries.reduce((acc, entry) => {
        const date = entry.created_at.split("T")[0];
        acc[date] = { marked: true, dotColor: "#c9788a" };
        return acc;
    }, {} as Record<string, any>);

    markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: "#72243e",
    };

    return(
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
                     padding:6,
                     gap:8,
                 }}
                 >
                    <ViewEntryModal
                        visible={visible}
                        setVisible={setVisible}
                        selectedEntry={selectedEntry}
                        fetchEntries={fetchEntries}
                    />
                   
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
                        <Calendar
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={markedDates}                              
                        theme={{
                            backgroundColor: "transparent",
                            calendarBackground: "transparent",
                            selectedDayBackgroundColor: "#72243e",
                            todayTextColor: "#72243e",
                            arrowColor: "#72243e",
                            textDayFontFamily: "Poppins",
                            textMonthFontWeight: "700",
                            textSectionTitleColor: "#202020ff",
                        }}
                        />

                    </View>
                    <View
                    style={{
                        borderRadius: 20,
                        borderColor: "#72243e",
                        borderWidth: 2,
                        padding: 16,
                        backgroundColor: "#a3174622",
                    }}
                    >
                      {loading ? (
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
                    ) : (
                        <EntriesList
                        data={filteredEntries}
                        setSelectedEntry={setSelectedEntry}
                        setVisible={setVisible}
                        />
                    )}
                    </View>
                </SafeAreaView>
        </ImageBackground>
    )
}