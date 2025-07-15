import { useGoalContext } from "@/context/GoalContext";
import { View, Button, Text, StyleSheet } from 'react-native';

export default function HiddenTests() {
    const { simulateNewDay, simulateNewWeek } = useGoalContext();
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>(reload app after pressing simulation buttons)</Text>
            <Button title="Simulate New Day" onPress={simulateNewDay}/>
            <Button title="Simulate New Week" onPress={simulateNewWeek}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 200
    },
    text: {
        color: 'grey',
        textAlign: 'center',
        paddingBottom: 10
    }
})