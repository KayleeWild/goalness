import { View, Image, StyleSheet, ImageSourcePropType, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";

type Props = {
    dullImage: ImageSourcePropType;
    colorImage: ImageSourcePropType;
    progress: number;
    imageHeightAndWidth: number;
};

export default function ProgressImage({ dullImage, colorImage, progress, imageHeightAndWidth }: Props) {
    const animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: progress,
            duration: 400, 
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const maskHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, imageHeightAndWidth],
    });

    return (
        <View style={[styles.container, { width: imageHeightAndWidth, height: imageHeightAndWidth }]}>
            <Image source={dullImage} style={styles.image} resizeMode="cover" />
            <View style={styles.overlayContainer} pointerEvents="none">
                <Animated.View style={[styles.mask, {height: maskHeight}]}>
                    <Image source={colorImage} style={[styles.coloredImage, { height: imageHeightAndWidth}]} resizeMode="cover" />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  mask: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  coloredImage: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});