import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
  <Tabs
    detachInactiveScreens={true}
    screenOptions={{
        lazy: true,
        headerStyle: {
        backgroundColor: '#B37EAC',
        },
        // headerShown: false, //toggle this on and off to make header appear/disappear
        headerTintColor: '#fdfdfd',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        tabBarStyle: {
            backgroundColor: '#fdfdfd'
        },
    }}>
    <Tabs.Screen name="index"
    options={{
        title: 'Home',
        tabBarActiveTintColor: "#B37EAC",
        tabBarIcon: ({ color, focused }) => (
            <Ionicons 
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={22}
            />
        ),  
    }} />
    {/* <Tabs.Screen name="journal" /> */}
    <Tabs.Screen name="explore"
    options={{
        title: 'Explore',
        tabBarActiveTintColor: "#B37EAC",
        tabBarIcon: ({ color, focused }) => (
            <Ionicons
                name={focused ? 'compass' : 'compass-outline'}
                color={color}
                size={22}
            />
        )
    }} />
    <Tabs.Screen name="highscores"
    options={{
        title: 'Records',
        tabBarActiveTintColor: "#B37EAC",
        tabBarIcon: ({ color, focused }) => (
            <Ionicons
                name={focused ? 'trophy' : 'trophy-outline'}
                color={color}
                size={22}
            />
        )
    }}
    />
    {/* <Tabs.Screen name="habits" /> */}
    {/* <Tabs.Screen name="more" /> */}
  </Tabs>
  );
}
