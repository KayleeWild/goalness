import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { JournalEntry } from '@/app/(tabs)/journal';

interface Props {
  entry: JournalEntry;
  onDelete: (id: string) => void;
  onEdit: (entry: JournalEntry) => void;
}

const JournalEntryCard: React.FC<Props> = ({ entry, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(entry.date).toDateString()}</Text>
      <Text style={styles.prompt}>{entry.prompt}</Text>
      <Text style={styles.text}>{entry.entry}</Text>
      <View style={styles.buttons}>
        <Button title="Delete" onPress={() => onDelete(entry.id)} color="#f37263ff" />
        <Button title="Edit" onPress={() => onEdit(entry)} color="#B37EAC" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  date: { 
    fontSize: 12, 
    color: '#888' 
  },
  prompt: { 
    fontWeight: 'bold', 
    marginVertical: 4,
    color: '#777'
  },
  text: { 
    marginBottom: 8, 
    color: '#555'
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
});

export default JournalEntryCard;
