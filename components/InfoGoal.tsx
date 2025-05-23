import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ImageBackground } from "expo-image";
import { ImageSourcePropType } from "react-native";
import { ScrollView } from "react-native";

type Props = {
    key: string,
    title: string;
    description: string;
    backgroundImage: ImageSourcePropType;
    onAdd: () => void;
};

export default function InfoGoal({title, description, backgroundImage, onAdd} : Props) {
    return (
        <ImageBackground source={backgroundImage} style={styles.card} imageStyle={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>{title}</Text>
                <ScrollView style={styles.descriptionBox}>
                    <Text style={styles.description}>{description}</Text>
                </ScrollView>
                <TouchableOpacity onPress={onAdd} style={styles.button}>
                    <Text style={styles.buttonText}>Add Goal</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 250,
        width: 250,
        margin: 10,
        borderRadius: 15,
        overflow: 'hidden',
    }, 
    background: {
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        // justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    descriptionBox: {
        maxHeight: 90,
    },
    description: {
        color: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignSelf: 'flex-start',
        marginTop: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#000',
        fontWeight: '600',
    },
})