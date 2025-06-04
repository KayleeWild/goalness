import { Modal, StyleSheet, View, Text, TouchableOpacity, ImageSourcePropType, ScrollView, Pressable, Alert } from "react-native";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import GoalSetupModal from "./GoalSetupModal";
import { useGoalContext } from "@/context/GoalContext";

type Props = {
    visible: boolean;
    // key: string,
    title: string;
    description: string;
    suggested: number;
    unit: string;
    onAdd: (intakeAmount: number) => void;
    onClose: () => void;
};

const background = require('@/assets/images/modalBackground.png')

export default function GoalModal({visible, title, description, suggested, unit, onAdd, onClose} : Props) {
    const [showSetup, setShowSetup] = useState(false); 
    const { goals } = useGoalContext();

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
                            <TouchableOpacity onPress={() => {
                                if (goals.length >= 3) {
                                    Alert.alert("Limit Reached", "You can only set up to 3 goals at once.");
                                    setShowSetup(false)
                                    return; 
                                } else {
                                    setShowSetup(true)
                                }
                            }} style={styles.button} >
                                <Text style={styles.buttonText}>Add Goal</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <GoalSetupModal 
                    visible={showSetup}
                    unit={unit}
                    suggested={suggested}
                    onClose={() => setShowSetup(false)}
                    onConfirm={(intakeAmount) => {
                        console.log("Confirmed intake amount: ", intakeAmount);
                        setShowSetup(false);
                        onAdd(intakeAmount);
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
        justifyContent: 'space-evenly',
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
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    descriptionBox: {
        maxHeight: 200,
        padding: 20,
    },
    description: {
        color: '#cccccc',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#B39C4D',
        padding: 10,
        alignSelf: 'center',
        marginVertical: 25,
        borderRadius: 8,
        // borderWidth: 1,
        borderColor: '#cccccc',
    },
    buttonText: {
        color: '#1C1D21',
        fontWeight: '600',
        fontSize: 20,
        paddingHorizontal: '30%',
    },
})