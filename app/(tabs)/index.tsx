import { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SwipeListView } from 'react-native-swipe-list-view';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useFocusEffect } from "@react-navigation/native";
import ConfettiCannon from 'react-native-confetti-cannon';
import AddGoal from "@/components/AddGoal";
import GoalSummary from "@/components/GoalSummary";
import { useGoalContext } from "@/context/GoalContext";


// constants
const FONT_SIZE = 22
const { width, height } = Dimensions.get('window');



export default function Index() {
  const [currentGoal, setCurrentGoal] = useState<{ amount: number; title: string } | null>(null); // null = not added yet
  const [editMode, setEditMode] =useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { goalAmount, goalTitle, refresh } = useLocalSearchParams();
  const { goals, removeGoal } = useGoalContext();

  const renderGoals = () => {
    const elements = [];

    for (let i = 0; i < 3; i++) {
      if (goals[i]) {
        elements.push(
          <View key={i} style={styles.goalRow}>
            <View style={{ flex: 1 }}>
              <GoalSummary 
                index={i}
                goal={goals[i]}
                onGoalCompleted={() => setShowConfetti(true)}
              />
            </View>
            {editMode && (
              <Pressable onPress={() => [removeGoal(i), setEditMode(false)]} style={styles.trashButton}>
                <SimpleLineIcons name="trash" size={20} color="#b00" />
              </Pressable>
            )}
          </View>
        );
      } else {
        elements.push(
          <AddGoal
            key={i}
            onPress={() => {
              if (goals.length >= 3) {
                Alert.alert("Limit Reached", "You can only have up to 3 goals at a time.");
              } else {
                router.push('/explore');
              }
            }}
          />
        );
      }
    }

    return elements;
  }

  useEffect(() => {
    if (goalAmount && goalTitle) {
      const parsedAmount = parseInt(goalAmount as string);
      if (!isNaN(parsedAmount)) {
        setCurrentGoal({ amount: parsedAmount, title: goalTitle as string});
      }
    }
  }, [goalAmount, goalTitle, refresh]);

  // Turns off edit mode when user navigates away from page
  useFocusEffect(
    useCallback(() => {
      return () => {
        setEditMode(false);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setEditMode(!editMode)}>
        <Text style={styles.thisWeek}>   this week   <SimpleLineIcons name="pencil" size={FONT_SIZE}/></Text>
      </Pressable>
      <View style={styles.goalsContainer}>
        {renderGoals()}
      </View>
      {showConfetti && (
                <View style={[StyleSheet.absoluteFillObject, { zIndex: 999 }]}>
                    <ConfettiCannon
                        count={100}
                        origin={{ x: width / 2, y: height - 50 }}
                        fadeOut
                        autoStart
                        explosionSpeed={200}
                        fallSpeed={2000}
                        onAnimationEnd={() => setShowConfetti(false)}
                    />
                </View>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  goalsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  thisWeek: {
    marginTop: 0,
    padding: 10,
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: '#fdfdfd',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#B37EAC',
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashButton: {
    padding: 20,
    marginLeft: 10,
    backgroundColor: '#F5CCCC',
    borderRadius: 100,
  },
})