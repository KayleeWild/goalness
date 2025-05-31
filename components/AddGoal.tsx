import {Pressable, StyleSheet, Text, View, PressableProps} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

type Props = {
    onPress: () => void;
};

export default function AddGoal({ onPress } : Props) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <SimpleLineIcons name="plus" size={50} color="#fdfdfd" />
            {/* <Text style={styles.text}>new goal</Text> */}
        </Pressable>
    );
} 

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#77A6B6",
        margin: 10,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
})