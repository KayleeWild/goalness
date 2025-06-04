import { View, Text, StyleSheet } from 'react-native';

type Props = {
    amount: number; // Goal amount to track (ie. 100 oz, 8 hrs, etc.)
    title: string; // Selected goal's title
}

export default function GoalSummary({amount, title}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.amount}>{amount} oz/day </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B3D9FF',
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
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
        color: '#1C1D21',
    },
});