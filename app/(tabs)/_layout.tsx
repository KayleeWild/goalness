import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
  <Tabs
    screenOptions={{
        headerStyle: {
        backgroundColor: 'purple',
        },
        // headerShown: false, //toggle this on and off to make header appear/disappear
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    }}>
    <Tabs.Screen name="index"
    options={{
        title: 'home',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons 
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={24}
            />
        ),
    }} />
    {/* <Tabs.Screen name="journal" /> */}
    <Tabs.Screen name="explore"
    options={{
        title: 'explore',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons
                name={focused ? 'compass' : 'compass-outline'}
                color={color}
                size={24}
            />
        )
    }} />
    {/* <Tabs.Screen name="habits" /> */}
    {/* <Tabs.Screen name="more" /> */}
  </Tabs>
  );
}
