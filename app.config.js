import 'dotenv/config';

export default ({ config }) => ({
    expo: {
        name: "goalness",
        slug: "goalness",
        version: "1.0.0",
        extra: {
            firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
            firebaseMeasurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
            "googleWebClientId": "1042001320965-s4rlbq3j1vlpihbh9uigc8r66c34a46r.apps.googleusercontent.com.apps.googleusercontent.com",
            "facebookAppId": "24152036784432410" 
        },
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "goalness",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,

        ios: {
            supportsTablet: true,
        },

        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true,
        },

        "web": {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },

        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff"
                }
            ],
            "expo-video",
            "expo-web-browser",
            "expo-facebook"

        ],

        experiments: {
           typedRoutes: true
        },
        
        splash: {
            image: "./assets/images/splash-icon.png",
            resizeMode: "cover",
            backgroundColor: "#B37EAC"
        },
    },
});