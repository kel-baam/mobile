
import { supabase } from "@/services/supabaseConfig";

export const addEntry = async (
  newTitle: string,
  newText: string,
  newIcon: string,
  setFormVisible: (v: boolean) => void,
  setNewTitle: (v: string) => void,
  setNewText: (v: string) => void,
  setNewIcon:(v: string) => void,
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log("No user logged in");
      return;
    }
    const now = new Date();

    const formatted = now.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }) + " à " + now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
    });
    const { data, error } = await supabase.from("notes").insert({
      title: newTitle,
      content: newText,
      icon: newIcon,
      user_id: user.id,
      email: user?.email,
      date:formatted

    });

    if (error) {
      console.log("Insert error:", error.message);
      return;
    }


    setNewTitle("");
    setNewText("");
    setNewIcon("")
    setFormVisible(false);

  } catch (err) {
    console.log("Unexpected error:", err);
  }
};