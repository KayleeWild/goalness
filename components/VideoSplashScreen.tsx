import { Video, ResizeMode } from "expo-av";
import { View, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
    onFinish: () => void;
};

export default function VideoSplashScreen({ onFinish }: Props) {
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={require('@/assets/videos/splash-icon.mp4')}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
                shouldPlay
                style={styles.video}
                onPlaybackStatusUpdate={(status) => {
                    if (status.isLoaded && status.didJustFinish) {
                        onFinish();
                    } 
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#B37EAC',
        zIndex: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '95%',
        aspectRatio: 1,
    },
});