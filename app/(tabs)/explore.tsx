import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import goalTemplates from "@/data/goalTemplates.json";
import GoalCard from "@/components/GoalCard";
import GoalModal from "@/components/GoalModal";
import { useGoalContext } from "@/context/GoalContext";
import imageMap from "@/assets/images/imageMap";
import CustomGoalModal from "@/components/CustomGoalModal";


// Dynamically import images
// ⚠️ Make sure to update this when adding new images!! ➡️ "filename.png": require('path/to/image/filename.png'),
// const imageMap: { [key: string]: any } = {
//   "waterBackground.png": require("@/assets/images/waterBackground.png"),
//   "sleepBackground.png": require("@/assets/images/sleepBackground.png"),
// };

export default function ExploreScreen() {
  const [selectedGoal, setSelectedGoal] = useState<null | typeof goalTemplates[0]>(null);
  const { addGoal } = useGoalContext();

  return (
    <ScrollView style={styles.container}>
        <View style={styles.grid}>
            {goalTemplates.map((goal) => (
                <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                backgroundImage={imageMap[goal.images.card]}
                onPress={() => setSelectedGoal(goal)}
                />
            ))}
        </View>
        {selectedGoal && selectedGoal.title == "Custom" && (
          <CustomGoalModal
            visible={!!selectedGoal}
            title={selectedGoal.title}
            description={selectedGoal.description}
            suggested={selectedGoal.suggestedAmount}
            unit={selectedGoal.unit}
            onAdd={(intakeAmount, customUnit) => {
                addGoal({ 
                  amount: intakeAmount, 
                  title: selectedGoal.title, 
                  increment: selectedGoal.increment,
                  unit: customUnit,
                  trackedAmount: 0,
                  dullImage: imageMap[selectedGoal.images.dull],
                    colorImage: imageMap[selectedGoal.images.color]});
                setSelectedGoal(null);
                  router.push('/');
                  console.log(`Added goal: ${selectedGoal.title}`);
              }}
            onClose={() => setSelectedGoal(null)}
          >
            
          </CustomGoalModal>
        )}
        {selectedGoal && (
            <GoalModal
              visible={!!selectedGoal}
              title={selectedGoal.title}
              description={selectedGoal.description}
              suggested={selectedGoal.suggestedAmount}
              unit={selectedGoal.unit}
              onAdd={(intakeAmount) => {
                addGoal({ 
                  amount: intakeAmount, 
                  title: selectedGoal.title, 
                  increment: selectedGoal.increment,
                  unit: selectedGoal.unit,
                  trackedAmount: 0,
                  dullImage: imageMap[selectedGoal.images.dull],
                    colorImage: imageMap[selectedGoal.images.color]});
                setSelectedGoal(null);
                  router.push('/');
                  console.log(`Added goal: ${selectedGoal.title}`);
              }}
              onClose={() => setSelectedGoal(null)}
            />
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd'
    // flex:  1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
