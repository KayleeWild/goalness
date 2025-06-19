import { Alert, View, Text, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { useGoalContext } from '@/context/GoalContext';
import ProgressImage from './ProgressImage';

type Props = {
    index: number;
    goal: {
        amount: number; // Goal amount to track (ie. 100 oz, 8 hrs, etc.)
        title: string; // Selected goal's title
        increment: number;
        unit: string;
        trackedAmount: number;
        dullImage: ImageSourcePropType;
        colorImage: ImageSourcePropType; 
    };
    onGoalCompleted?: () => void;
}

const COLOR = '#ababab';
const IMAGE_HEIGHT_AND_WIDTH = 75;

export default function GoalSummary({ index, goal, onGoalCompleted }: Props) {
    const { updateTrackedAmount } = useGoalContext();
    const progress = Math.min(goal.trackedAmount / goal.amount, 1);

    const handleIncrement = () => {
        let newAmount = goal.trackedAmount + goal.increment;

        if (newAmount >= goal.amount && goal.trackedAmount < goal.amount) {
            Alert.alert("Are you sure you want to complete this goal?", "", 
                [{
                    text: "Complete",
                    onPress: () => {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        onGoalCompleted?.(); // tells index page to trigger confetti
                    }
                },{
                    text: "Cancel",
                    style: 'cancel',
                    onPress: () => {newAmount = newAmount - goal.increment, updateTrackedAmount(index, newAmount);}
                }
            ])
            
        }
        updateTrackedAmount(index, newAmount);
        Haptics.selectionAsync();
    };

    const handleDecrement = () => {
        const newAmount = Math.max(goal.trackedAmount - goal.increment, 0);
        updateTrackedAmount(index, newAmount);
        Haptics.selectionAsync();
    };
    
    const renderSummary = () => {
        const elements = [];
        const isComplete = goal.trackedAmount >= goal.amount;

        if (isComplete) {
            elements.push(
                <View style={styles.container}>
                    <ProgressImage
                        dullImage={goal.dullImage}
                        colorImage={goal.colorImage}
                        progress={progress}
                        imageHeightAndWidth={IMAGE_HEIGHT_AND_WIDTH}
                    />
                    {/* <Text style={styles.amount}>Completed!</Text> */}
                    <Text style={styles.amount}>{goal.trackedAmount}/{goal.amount} {goal.unit}</Text>
                </View>
            )
        } else {
            elements.push(
                <View style={styles.container}>
                    <ProgressImage
                        dullImage={goal.dullImage}
                        colorImage={goal.colorImage}
                        progress={progress}
                        imageHeightAndWidth={IMAGE_HEIGHT_AND_WIDTH}
                    />
                    <Text style={styles.amount}>{goal.trackedAmount}/{goal.amount} {goal.unit}</Text>
                    <Pressable onPress={handleDecrement}>
                        <Text style={styles.track}>-</Text>
                    </Pressable>
                    <Pressable onPress={handleIncrement}>
                        <Text style={styles.track}>+</Text>
                    </Pressable>
                </View>
            )
        }
        return elements;
    }

    return (
        // <View style={styles.container}>
        //     <ProgressImage
        //         dullImage={goal.dullImage}
        //         colorImage={goal.colorImage}
        //         progress={progress}
        //         imageHeightAndWidth={IMAGE_HEIGHT_AND_WIDTH}
        //     />
        //     <Text style={styles.amount}>{goal.trackedAmount}/{goal.amount}</Text>
        //     <Pressable onPress={handleDecrement}>
        //         <Text style={styles.track}>-</Text>
        //     </Pressable>
        //     <Pressable onPress={handleIncrement}>
        //         <Text style={styles.track}>+</Text>
        //     </Pressable>
        // </View>
        <>
            {renderSummary()}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        height: 125
        
    },
    image: {
        width: 50,
        height: 50,
        // borderWidth: 1,
        // borderColor: 'black',
        // backgroundColor: 'green'
    },
    text: {
        fontSize: 18,
        color: '#1C1D21',
        marginBottom: 5,
        fontWeight: '600',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLOR,
    },
    track: {
        fontSize: 34,
        color: COLOR,
        fontWeight: 'bold',
    },
});