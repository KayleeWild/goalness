import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { JournalEntry } from '@/app/(tabs)/journal';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<JournalEntry, 'id'>) => void;
  initialData?: Omit<JournalEntry, 'id'> | null;
}

const prompts = [
  "What went well today?",
  "What challenged you today?",
  "What are you grateful for?",
  "What can you do to break old habits?",
  "What are some obstacles you face?"
];

const EntryFormModal: React.FC<Props> = ({ visible, onClose, onSubmit, initialData }) => {
  const [prompt, setPrompt] = useState(prompts[0]);
  const [entry, setEntry] = useState("");

  useEffect(() => {
    if (initialData) {
        setPrompt(initialData.prompt);
        setEntry(initialData.entry);
    } else {
        setPrompt(prompts[0]);
        setEntry("");
    }
    }, [initialData, visible]);


  const handleSubmit = () => {
    if (entry.trim()) {
      onSubmit({ date: new Date().toISOString(), prompt, entry });
      setEntry("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.label}>Select a Prompt</Text>
            <Picker
                selectedValue={prompt}
                onValueChange={(itemValue) => setPrompt(itemValue)}
                style={styles.picker}
                itemStyle={{ color: '#222', fontSize: 16}}
            >
                {prompts.map((p, index) => (
                    <Picker.Item key={index} label={p} value={p} />
                ))}
            </Picker>
            <TextInput
              multiline
              style={styles.input}
              placeholder="Write your thoughts here..."
              placeholderTextColor='#999'
              value={entry}
              onChangeText={setEntry}
            />
            <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={onClose} color="gray" />
                <Button title="Submit" onPress={handleSubmit} color="#B37EAC" />
            </View>
          </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1, 
    marginHorizontal: 10,
    marginVertical: 20
  },
  label: { 
    fontSize: 24, 
    marginBottom: 6,
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#999',
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  picker: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  }
});

export default EntryFormModal;
