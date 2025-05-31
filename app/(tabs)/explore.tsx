import { View, StyleSheet, ScrollView } from "react-native";
import goalTemplates from "@/data/goalTemplates.json";
import GoalCard from "@/components/GoalCard";
import GoalModal from "@/components/GoalModal";
import { useState } from "react";

// Dynamically import images
// ⚠️ Make sure to update this when adding new images!! ➡️ "filename.png": require('path/to/image/filename.png'),
const imageMap: { [key: string]: any } = {
  "waterBackground.png": require("@/assets/images/waterBackground.png"),
  "sleepBackground.png": require("@/assets/images/sleepBackground.png"),
};

export default function ExploreScreen() {
  const [selectedGoal, setSelectedGoal] = useState<null | typeof goalTemplates[0]>(null);

  return (
    <ScrollView style={styles.container}>
        <View style={styles.grid}>
            {goalTemplates.map((goal) => (
                <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                backgroundImage={imageMap[goal.image]}
                onAdd={() => console.log(`Added goal: ${goal.id}`)}
                onPress={() => setSelectedGoal(goal)}
                />
            ))}
        </View>

        {selectedGoal && (
            <GoalModal
                visible={!!selectedGoal}
                title={selectedGoal.title}
                description={selectedGoal.description}
                backgroundImage={imageMap[selectedGoal.image]}
                onAdd={() => {
                    console.log(`Added goal: ${selectedGoal.id}`);
                    setSelectedGoal(null);
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
