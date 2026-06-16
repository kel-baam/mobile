import { supabase } from "@/services/supabaseConfig";
import { signOut } from "./supabaseAuth";
import { Alert } from "react-native";

export const handleLogout = () => {
        Alert.alert("Log out", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log out",
                style: "destructive",
                onPress: () => signOut().catch((e) => Alert.alert("Error", e.message)),
            },
        ]);
    };
