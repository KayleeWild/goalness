import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  words: string[];
  onChange: (updated: string[]) => void;
}

const MoodWordPicker: React.FC<Props> = ({ words, onChange }) => {
  const updateWord = (text: string, index: number) => {
    const updated = [...words];
    updated[index] = text;
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      {words.map((word, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Word ${i + 1}`}
          value={word}
          onChangeText={(text) => updateWord(text, i)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12, 
  },
  input: {
    padding: 6,
    flex: 1,
    marginVertical: 10,
    borderRadius: 6,
    fontSize: 20,
    color: '#333',
  },
});

export default MoodWordPicker;
