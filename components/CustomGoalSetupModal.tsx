import { useRef, useState } from "react";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

type Props = {
    customTitle: string;
    visible: boolean;
    suggested: number;
    unit: string;
    onClose: () => void;
    onConfirm: (intakeAmount: number, unit: string, customTitle: string) => void;
};

export default function CustomGoalSetupModal({customTitle, visible, suggested, unit, onClose, onConfirm}: Props) {
  // States:
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(suggested));
  const [customUnit, setCustomUnit] = useState(unit); // default to passed-in unit
  const commonUnits = ['g', 'oz', 'min', 'hrs', 'lbs', 'pages', 'smiles'];


  const inputRef = useRef<TextInput>(null);

  // Functions:
  const handleConfirm = () => {
      const parsed = Number(inputValue);
      if (!isNaN(parsed)) {
          onConfirm(parsed, customUnit, customTitle);
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
                {/* fix this to represent individual data later */}
                <Text style={styles.header}>Set your own custom goal for "{customTitle}"</Text> 

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
                <Text style={styles.label}>Choose a unit or type your own</Text>
                <View style={styles.unitRow}>
                {commonUnits.map((u) => (
                    <TouchableOpacity
                        key={u}
                        onPress={() => setCustomUnit(u)}
                        style={[
                            styles.unitButton,
                            customUnit === u && styles.unitButtonSelected
                        ]}
                    >
                        <Text style={[
                            styles.unitText,
                            customUnit === u && styles.unitTextSelected
                        ]}>{u}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                <TextInput
                    placeholder="custom unit"
                    // value={customTitle}
                    onChangeText={setCustomUnit}
                    style={styles.unitInput}
                />
                  <Text style={styles.label}>(tap outside this box to go back)</Text>

                  <View style={styles.bottomRow}>
                      <TouchableOpacity onPress={() => {
                          setIsEditing(true);
                          setTimeout(() => {
                              inputRef.current?.focus();
                          }, 50);
                          }}
                      >
                          <Text style={styles.changeText}>Change amount</Text>
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
    // height: 430,
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
    marginVertical: 8,
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
  unitRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  unitButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#333',
    borderRadius: 8,
    margin: 4,
  },
  unitButtonSelected: {
    backgroundColor: '#B37EAC',
  },
  unitText: {
    color: '#ccc',
    fontSize: 16,
  },
  unitTextSelected: {
    color: '#1C1D21',
    fontWeight: 'bold',
  },
  unitInput: {
    borderBottomWidth: 1,
    borderColor: '#858585',
    color: '#858585',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
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