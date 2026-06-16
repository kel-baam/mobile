import { Redirect, Stack, router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

export default function RootLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/");
    }
  }, [user, loading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    />
  );
}
