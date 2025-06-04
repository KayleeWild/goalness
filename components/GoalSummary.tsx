import  Ionicons  from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';

type Props = {
    amount: number; // Goal amount to track (ie. 100 oz, 8 hrs, etc.)
    title: string; // Selected goal's title
    increment: number;
}

const COLOR = '#ababab';

export default function GoalSummary({amount, title, increment}: Props) {
    const [tracked, setTracked] = useState(0); // Amount user has tracked so far
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>{title}</Text> */}
            <Ionicons name={'water'} size={24} color={COLOR}/>
            <Text style={styles.amount}>{tracked}/{amount}</Text>
            <Pressable onPress={() => setTracked(tracked + increment)}>
                <Text style={styles.track}>+</Text>
            </Pressable>
            <Pressable onPress={() => setTracked(Math.max(tracked - increment, 0))}>
                <Text style={styles.track}>-</Text>
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