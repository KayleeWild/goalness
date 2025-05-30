import {Pressable, StyleSheet, Text, View, PressableProps} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

type Props = {
    onPress: () => void;
};
const TEXT_SIZE = 40

export default function AddGoal({ onPress } : Props) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <SimpleLineIcons name="plus" size={TEXT_SIZE} color="#FFFFE8" />
            {/* <Text style={styles.text}>new goal</Text> */}
        </Pressable>
    );
} 

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#77A6B6",
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        padding: 5,
        color: '#FFFFE8',
        fontSize: TEXT_SIZE,
    }
})