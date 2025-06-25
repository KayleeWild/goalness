import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import VideoSplashScreen from "@/components/VideoSplashScreen";
import { GoalProvider } from "@/context/GoalContext";
import { useAuth, AuthProvider, useProtectedRoute } from "@/context/AuthContext";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  
  return (
    <AuthProvider>
      <RootLayoutContent showSplash={showSplash} setShowSplash={setShowSplash} />
    </AuthProvider>
  );
}

function RootLayoutContent({ showSplash, setShowSplash }: { showSplash: boolean, setShowSplash: (s: boolean) => void }) {
  const { user, loading } = useAuth();
  useProtectedRoute(user, loading);

  if (showSplash) {
    return <VideoSplashScreen onFinish={() => setShowSplash(false)} />;
  }
  
  if (loading) {
    return (
      <Stack>
        <Stack.Screen name="loading" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
      <GoalProvider>
        <Stack>
          {user ? (
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
            }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
      </GoalProvider>
  );
}