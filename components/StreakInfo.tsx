import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

export default function StreakInfo({ onClose }: { onClose: () => void }) {
  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.tooltip}>
          <Text style={styles.text}>
            🔥 Your streak increases every time you complete at least one goal each day! It will reset if you don't complete any goal by midnight. Watch out! Streak resetting is irreversable so be sure to log in every day!
          </Text>
          <Pressable onPress={onClose}>
            <Text style={styles.button}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tooltip: {
    backgroundColor: '#fff', 
    padding: 30, 
    borderRadius: 10, 
    maxWidth: '80%', 
    alignItems: 'center'
  },
  text: {
    fontSize: 16, 
    marginBottom: 30, 
    textAlign: 'center'
  },
  button: {
    color: '#B37EAC', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});
