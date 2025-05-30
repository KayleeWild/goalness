import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ImageBackground } from "expo-image";
import { ImageSourcePropType, ScrollView, Pressable } from "react-native";

type Props = {
    // key: string,
    title: string;
    description: string;
    backgroundImage: ImageSourcePropType;
    onAdd: () => void;
    onPress: () => void;
};

export default function InfoGoal({title, backgroundImage, onPress} : Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground source={backgroundImage} style={styles.card} imageStyle={styles.background}>
                <View style={styles.overlay}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 150,
        margin: 10,
        borderRadius: 15,
        overflow: 'hidden',
    }, 
    background: {
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 22,
        color: '#fdfdfd',
        fontWeight: 'bold',
    },
})