import { Stack } from "expo-router";
import { useState } from "react";
import VideoSplashScreen from "@/components/VideoSplashScreen";
import { GoalProvider } from "@/context/GoalContext";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  
  if (showSplash) {
    return <VideoSplashScreen onFinish={() => setShowSplash(false)} />;
  }
  
  return (
    <GoalProvider>
      <Stack>
        <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }} />
      </Stack>
    </GoalProvider>
  );
}
