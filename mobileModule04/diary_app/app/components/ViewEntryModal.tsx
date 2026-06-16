import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { emojiToText } from "../components/emojiToText";
import { formatDate } from "../utils/formatDate";
import { deleteNote } from "@/services/supabaseAuth";
import { Note } from "../types/Note";


interface ViewEntryModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  selectedEntry: Note | null;
  fetchEntries: () => Promise<void>;
}

export function ViewEntryModal({
  visible,
  setVisible,
  selectedEntry,
  fetchEntries,
}: ViewEntryModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                if (selectedEntry?.id) {
                  await deleteNote(selectedEntry.id);
                  await fetchEntries();
                }
                setVisible(false);
              }}
              style={{
                borderRadius: 20,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="trash-2" size={24} color="#72243e" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVisible(false)}
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

          {/* Title, date, emoji */}
          <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
             <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 22,
              fontWeight: "bold",
              color: "#72243e",
              marginBottom: 6,
            }}
          >
            {selectedEntry ? formatDate(selectedEntry?.date):""}
          </Text>

        
          </View>

            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                color: "#c9788a",
              }}
            >
              Feeling:
            </Text>
            <Text style={{ fontSize: 24 }}>{selectedEntry ? emojiToText(selectedEntry?.icon):""}</Text>
          </View>
          {/* Divider */}
          <View style={{ height: 1, backgroundColor: "#f4c0d1", marginBottom: 16 }} />

          {/* Entry content */}
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 14,
              color: "#4b1528",
              lineHeight: 22,
            }}
          >
              {selectedEntry?.content?.slice(0, 500)}
          </Text>
        </View>
      </View>
    </Modal>
  );
}