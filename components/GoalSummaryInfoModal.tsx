import { useRef, useState } from "react";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

type Props = {
    visible: boolean;
    goalAmount: number;
    title: string;
    unit: string;
    customTitle?: string;
    onClose: () => void;
    onConfirm: (intakeAmount: number) => void;
};

export default function GoalSummaryInfoModal({visible, goalAmount, title, unit, customTitle, onClose, onConfirm}: Props) {
  // States:
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(goalAmount));

  const inputRef = useRef<TextInput>(null);

  // Functions:
  const handleConfirm = () => {
      const parsed = Number(inputValue);
      if (!isNaN(parsed)) {
          onConfirm(parsed);
          setIsEditing(false);
          setInputValue(String(inputValue));
      }
      onClose();
  };

  return (
      <Modal visible={visible} transparent animationType="fade">
          <View style={styles.overlay}>
              <Pressable style={styles.backdrop} onPress={onClose} />
              <View style={styles.modalContent}>
                  <Text style={styles.header}>{customTitle || title}</Text> 
                  <Text style={styles.label}>Your current goal amount is</Text>
                  {isEditing ? (
                      <TextInput 
                          ref={inputRef}
                          style={styles.input}
                          value={String(inputValue)}
                          keyboardType="numeric"
                          onChangeText={setInputValue}
                          onSubmitEditing={() => setIsEditing(false)}
                      />
                  ) : (
                      <TouchableOpacity onPress={() => {
                        setIsEditing(true); 
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 50);
                      }}>
                        <Text style={styles.amount}>{inputValue} {unit}</Text>
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
    // height: 430,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
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