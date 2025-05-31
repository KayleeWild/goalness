import { useRef, useState } from "react";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onConfirm: (intakeAmount: number) => void;
};

export default function GoalSetupModal({visible, onClose, onConfirm}: Props) {
    // States:
    const [intakeAmount, setIntakeAmount] = useState(100); //in terms of oz. Update later with tailored value based on weight/gender 
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('100');

    const inputRef = useRef<TextInput>(null);

    // Functions:
    const handleConfirm = () => {
        const parsed = parseInt(inputValue);
        if (!isNaN(parsed)) {
            onConfirm(parsed);
            setIsEditing(false);
            setInputValue(String(parsed));
        }
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                <View style={styles.modalContent}>
                    {/* fix this to represent individual data later */}
                    <Text style={styles.header}>Based on the average person...</Text> 

                    {isEditing ? (
                        <TextInput 
                            ref={inputRef}
                            style={styles.input}
                            value={inputValue}
                            keyboardType="numeric"
                            onChangeText={setInputValue}
                            onSubmitEditing={() => setIsEditing(false)}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <Text style={styles.amount}>{inputValue} oz</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.label}>is your recommended daily amount.</Text>

                    <View style={styles.bottomRow}>
                        <TouchableOpacity onPress={() => {
                            setIsEditing(true);
                            setTimeout(() => {
                                inputRef.current?.focus();
                            }, 50);
                            }}
                        >
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} style={styles.goButton}>
                            <Text style={styles.goText}>Let's Go!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#1C1D21',
    padding: 34,
    borderRadius: 20,
    width: 335,
    height: 430,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#858585',
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#858585',
    textAlign: 'center',
  },
  amount: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#858585',
    marginBottom: 8,
  },
  input: {
    fontSize: 80,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#858585',
    // width: 120,
    textAlign: 'center',
    marginBottom: 8,
    color: '#858585'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  changeText: {
    fontSize: 18,
    color: '#b37eac',
  },
  goButton: {
    backgroundColor: '#B37EAC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  goText: {
    color: '#1C1D21',
    fontWeight: '600',
    fontSize: 18,
  },
});