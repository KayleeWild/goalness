import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { useState } from 'react';
import { useGoalContext } from '@/context/GoalContext';
import ProgressImage from './ProgressImage';

type Props = {
    index: number;
    goal: {
        amount: number; // Goal amount to track (ie. 100 oz, 8 hrs, etc.)
        title: string; // Selected goal's title
        increment: number;
        trackedAmount: number;
        dullImage: ImageSourcePropType;
        colorImage: ImageSourcePropType; 
    }
}

const COLOR = '#ababab';
const IMAGE_HEIGHT_AND_WIDTH = 75;

export default function GoalSummary({ index, goal }: Props) {
    // const [tracked, setTracked] = useState(0); // Amount user has tracked so far
    const { updateTrackedAmount } = useGoalContext();
    const progress = Math.min(goal.trackedAmount / goal.amount, 1);

    const handleIncrement = () => {
        const newAmount = goal.trackedAmount + goal.increment;
        updateTrackedAmount(index, newAmount);
    };

    const handleDecrement = () => {
        const newAmount = Math.max(goal.trackedAmount - goal.increment, 0);
        updateTrackedAmount(index, newAmount);
    };
    
    return (
        <View style={styles.container}>
            {/* <Image source={goal.dullImage} style={styles.image}></Image> */}
            <ProgressImage
                dullImage={goal.dullImage}
                colorImage={goal.colorImage}
                progress={progress}
                imageHeightAndWidth={IMAGE_HEIGHT_AND_WIDTH}
            />
            <Text style={styles.amount}>{goal.trackedAmount}/{goal.amount}</Text>
            <Pressable onPress={handleDecrement}>
                <Text style={styles.track}>-</Text>
            </Pressable>
            <Pressable onPress={handleIncrement}>
                <Text style={styles.track}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
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