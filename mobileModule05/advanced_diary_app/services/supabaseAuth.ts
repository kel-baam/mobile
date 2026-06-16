import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabaseConfig";

const redirectTo = "diaryapp://auth-callback";

export const addNote = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const { data, error } = await supabase.from("notes").insert({
    title: "My first note",
    content: "Hello from React Native",
    icon: "book",
    user_id: user?.id,
    user_email: user?.email,

  });


  if (error) {
    console.log("Error inserting note:", error.message);
  } else {
    console.log("Note added:", data);
  }
}; 

export const deleteNote = async (noteId: string) => {

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.log("Error deleting note:", error.message);
  } else {
    console.log("Note deleted successfully");
  }
};


const finishOAuth = async (result: WebBrowser.WebBrowserAuthSessionResult) => {
  if (result.type !== "success") {
    throw new Error("Sign-in cancelled");
  }

  // Supabase puts tokens in the URL hash after redirect
  const hash = result.url.split("#")[1] ?? "";
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  
  if (!accessToken || !refreshToken) {
    throw new Error("No tokens returned — check Supabase redirect URL config");
  }
  
  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  
  if (error) throw error;
 
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true },
  });

  if (error) throw error;
  if (!data?.url) throw new Error("No OAuth URL from Supabase");

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  await finishOAuth(result);
};

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo, skipBrowserRedirect: true },
  });

  if (error) throw error;
  if (!data?.url) throw new Error("No OAuth URL from Supabase");

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  await finishOAuth(result);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
