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
                    <Text style={styles.header}>Set Your Water Goal</Text>
                    <Text style={styles.label}>Daily Intake (oz)</Text>

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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: 300,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    fontSize: 32,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: 120,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  changeText: {
    fontSize: 16,
    color: '#007AFF',
  },
  goButton: {
    backgroundColor: '#77A6B6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  goText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});