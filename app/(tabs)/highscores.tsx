import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useGoalContext } from '@/context/GoalContext';

export default function HighScores() {
    const { goalCompletionTotals, streak, bestStreak, goals } = useGoalContext();

    const scoresArray = Object.entries(goalCompletionTotals)
      .map(([title, score]) => {
        const goal = goals.find(g => g.title === title);
        return {
            title,
            score,
            icon: goal?.colorImage,
        };
      })
      .sort((a, b) => b.score - a.score);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Personal Records :</Text>
            <View style={styles.streakContainer}>
                <Text style={styles.streakLabel}>Current Streak</Text>
                <Text style={styles.streakValue}>{streak}</Text>
                <Text style={styles.bestStreak}>Best Streak: {bestStreak}</Text>
            </View>
            {scoresArray.length === 0 ? (
                <View>
                    <Text style={{ textAlign: 'center', color: '#888', fontSize: 25}}>No personal records yet!</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15}}>Go to the home page to log some goals!</Text>
                </View>
            ) : (
                <FlatList
                data={scoresArray}
                keyExtractor={(item) => item.title}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.score}>{item.score}</Text>
                    </View>
                )}
            />
            )}
            <TouchableOpacity
                style={styles.infoButton}
                onPress={() => Alert.alert(
                    "What do these scores mean?",
                    "• Current Streak = number of consecutive days you’ve completed at least one goal.\n\n• Goal Scores = total times you've completed each goal.\n\nTo improve: complete your goals daily and try not to remove completed goals!"
                )}
            >
                <Text style={styles.infoIcon}>ⓘ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center'
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  streakLabel: {
    fontSize: 18,
    color: '#666',
  },
  streakValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  bestStreak: {
    fontSize: 14,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  icon: { 
    width: 32, 
    height: 32, 
    marginRight: 16 
  },
  title: { 
    flex: 1, 
    fontSize: 16 
  },
  score: { 
    fontWeight: '600', 
    fontSize: 16 
  },
  infoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 8,
  },
  infoIcon: {
    fontSize: 20,
  },
});