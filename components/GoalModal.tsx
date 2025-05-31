import { Modal, StyleSheet, View, Text, TouchableOpacity, ImageSourcePropType, ScrollView, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import GoalSetupModal from "./GoalSetupModal";

type Props = {
    visible: boolean;
    // key: string,
    title: string;
    description: string;
    backgroundImage: ImageSourcePropType;
    onAdd: () => void;
    onClose: () => void;
};

const background = require('@/assets/images/modalBackground.png')

export default function GoalModal({visible, title, description, onAdd, onClose} : Props) {
    const [showSetup, setShowSetup] = useState(false); 

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.modalOverlay}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                <View> 
                    <ImageBackground source={background} style={styles.card} imageStyle={styles.background}>
                        <View style={styles.overlay}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}> X </Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>{title}</Text>
                            <ScrollView style={styles.descriptionBox}>
                                <Text style={styles.description}>{description}</Text>
                            </ScrollView>
                            <TouchableOpacity onPress={() => setShowSetup(true)} style={styles.button} >
                                <Text style={styles.buttonText}>Add Goal</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <GoalSetupModal 
                    visible={showSetup}
                    onClose={() => setShowSetup(false)}
                    onConfirm={(intakeAmount) => {
                        console.log("Confirmed intake amount: ", intakeAmount);
                        setShowSetup(false);
                        onAdd();
                    }}
                />
            </View>
        </Modal>
        
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        height: 400,
        width: 350,
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
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    title: {
        fontSize: 36,
        color: '#cccccc',
        fontWeight: 'bold',
        marginTop: -10,
        paddingHorizontal: 10
    },
    descriptionBox: {
        maxHeight: 200,
        padding: 20,
    },
    description: {
        color: '#cccccc',
        fontSize: 20,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#42033D',
        padding: 10,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    buttonText: {
        color: '#fdfdfd',
        fontWeight: '600',
        fontSize: 30,
        padding: 10,
    },
})