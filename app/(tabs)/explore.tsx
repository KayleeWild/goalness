import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import goalTemplates from "@/data/goalTemplates.json";
import GoalCard from "@/components/GoalCard";
import GoalModal from "@/components/GoalModal";
import { useGoalContext } from "@/context/GoalContext";
import imageMap from "@/assets/images/imageMap";
import CustomGoalModal from "@/components/CustomGoalModal";

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
        {/* If selected goal is a custom goal */}
        {selectedGoal && selectedGoal.title == "Custom" && (
          <CustomGoalModal
            visible={!!selectedGoal}
            title={selectedGoal.title}
            description={selectedGoal.description}
            suggested={selectedGoal.suggestedAmount}
            unit={selectedGoal.unit}
            onAdd={(intakeAmount, customUnit, customTitle) => {
                addGoal({ 
                  amount: intakeAmount, 
                  title: selectedGoal.title, 
                  increment: selectedGoal.increment,
                  unit: customUnit,
                  trackedAmount: 0,
                  customTitle: customTitle,
                  dullImage: imageMap[selectedGoal.images.dull],
                  colorImage: imageMap[selectedGoal.images.color]
                });
                setSelectedGoal(null);
                router.push('/');
                console.log(`Added goal: ${selectedGoal.title}`);
              }}
            onClose={() => setSelectedGoal(null)}
          >
            
          </CustomGoalModal>
        )}
        {/* If selected goal is not custom */}
        {selectedGoal && selectedGoal.title != "Custom" && (
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
                  colorImage: imageMap[selectedGoal.images.color]
                });
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
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
