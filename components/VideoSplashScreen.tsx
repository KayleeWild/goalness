import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useVideoPlayer, VideoView } from 'expo-video';

type Props = {
    onFinish: () => void;
};

export default function VideoSplashScreen({ onFinish }: Props) {
    const videoSource = require('@/assets/videos/splash-icon.mp4');
    const player = useVideoPlayer(videoSource, (p) => {
        p.play();
        p.loop = false;
    });

    useEffect(() => {
        const timeout = setTimeout( onFinish, 3000);
        return () => {
            clearTimeout(timeout);
            // player?.pause();
        };
    }, []);

    return (
        <View style={styles.container}>
            <VideoView
                style={styles.video}
                player={player}
                allowsPictureInPicture={false}
            />
        </View>
    );
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