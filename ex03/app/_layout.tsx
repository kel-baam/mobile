import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
  >
    <Stack.Screen
    name="index"
    options={{
    title: 'Calculator',
    headerTitleAlign: "center",
    headerStyle: {
            backgroundColor: "#9AB17A", // 🔥 background color
          },
    }}
    >

    </Stack.Screen>
  </Stack>
}
