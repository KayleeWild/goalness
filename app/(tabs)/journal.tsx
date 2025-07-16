// screens/JournalPage.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import EntryFormModal from '@/components/EntryFormModal';
import MoodWordPicker from '@/components/MoodWordPicker';
import JournalEntryCard from '@/components/JournalEntryCard';

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  entry: string;
}

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [moodWords, setMoodWords] = useState<string[]>(["", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [entryToEdit, setEntryToEdit] = useState<Omit<JournalEntry, 'id'> | null>(null);

  const addEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    const entryWithId: JournalEntry = { ...newEntry, id: Date.now().toString() };
    setEntries(prev => [...prev, entryWithId]);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const editEntry = (entry: JournalEntry) => {
    setEntryToEdit({ prompt: entry.prompt, entry: entry.entry, date: entry.date });
    setEditingEntryId(entry.id);
    setModalVisible(true);
  };

  const updateEntry = (updatedEntry: JournalEntry) => {
    setEntries(prev =>
        prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  };

  const handleEntrySubmit = (newEntry: Omit<JournalEntry, 'id'>) => {
    if (editingEntryId) {
        const updatedEntry: JournalEntry = { ...newEntry, id: editingEntryId };
        updateEntry(updatedEntry);
        editEntry({ ...newEntry, id: editingEntryId });
        setEditingEntryId(null);
        setEntryToEdit(null);
    } else {
        addEntry(newEntry);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JournalEntryCard
            entry={item}
            onDelete={deleteEntry}
            onEdit={() => editEntry(item)}
          />
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>My Mood Words</Text>
            <Text style={styles.description}>Describe how you'd like to feel after completing your goals regularly...</Text>
            <MoodWordPicker words={moodWords} onChange={setMoodWords} />

            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>New journal entry</Text>
            </Pressable>
            <Text style={styles.title}>Past Entries</Text>
          </>
        }
      />

      <EntryFormModal
        visible={modalVisible}
        onClose={() => {
            setModalVisible(false)
            setEditingEntryId(null)
            setEntryToEdit(null);
        }}
        onSubmit={handleEntrySubmit}
        initialData={entryToEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    margin: 26 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#B39C4D',
  },
  description: {
    color: '#aaa',
    fontSize: 14
  },
  button: {
    backgroundColor: '#607744',
    padding: 20,
    borderRadius: 10,
    borderColor: '#123123',
    borderWidth: 1,
    marginBottom: 16,
  },
  buttonText: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 22,
  }
});

export default JournalPage;
