import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

export default function StreakModal({ streak, onClose }: { streak: number, onClose: () => void }) {
    const [displayed, setDisplayed] = useState(streak - 1);

    useEffect(() => {
        let id = setInterval(() => {
            setDisplayed(prev => {
                if (prev < streak) return prev + 1;
                clearInterval(id);
                return prev;
            });
        }, 750);
        return () => clearInterval(id);
    }, [streak]);

    return (
        <Modal transparent animationType="fade">
            <View  style={styles.modalContainer}>
                <Text style={styles.streakText}>🔥 {displayed}</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.closeText}>Tap to continue</Text>
                </Pressable>
            </View>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakText: {
        fontSize: 64,
        color: '#fff',
        fontWeight: 'bold',
    },
    closeText: {
        color: '#ccc',
        marginTop: 20,
        fontSize: 18,
    },
});
