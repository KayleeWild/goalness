import { Stack } from "expo-router";
import { useState } from "react";
import VideoSplashScreen from "@/components/VideoSplashScreen";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  
  if (showSplash) {
    return <VideoSplashScreen onFinish={() => setShowSplash(false)} />;
  }
  
  return (
    <Stack>
      <Stack.Screen 
      name="(tabs)" 
      options={{ 
        headerShown: false,
      }} />
    </Stack>
  );
}
