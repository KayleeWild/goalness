import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AddGoal from "@/components/AddGoal";
import GoalSummary from "@/components/GoalSummary";
import { useGoalContext } from "@/context/GoalContext";


// constants
const FONT_SIZE = 22


export default function Index() {
  const [currentGoal, setCurrentGoal] = useState<{ amount: number; type: string } | null>(null); // null = not added yet
  const { goalAmount, goalType, refresh } = useLocalSearchParams();
  const { goals } = useGoalContext();

  useEffect(() => {
    if (goalAmount && goalType) {
      const parsedAmount = parseInt(goalAmount as string);
      if (!isNaN(parsedAmount)) {
        setCurrentGoal({ amount: parsedAmount, type: goalType as string});
      }
    }
  }, [goalAmount, goalType, refresh]);

  return (
    <View style={styles.container}>
        <Text style={styles.thisWeek}>   this week   <SimpleLineIcons name="pencil" size={FONT_SIZE}/></Text>
        <View style={styles.goalsContainer}>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <GoalSummary key={index} amount={goal.amount} type={goal.type} />
            ))
          ) : (
            <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          )}
          {/* placeholder 2 & 3 */}
          {/* <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal> */}
        </View>
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
    marginHorizontal: 40,
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
})