import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AddGoal from "../../components/AddGoal";
import { router } from "expo-router";

// constants
const FONT_SIZE = 22

// functions


export default function Index() {
  return (
    <View style={styles.container}>
        <Text style={styles.thisWeek}>   this week   <SimpleLineIcons name="pencil" size={FONT_SIZE}/></Text>
        <View style={styles.goalsContainer}>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: '#FDFDFD',
  },
  goalsContainer: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  thisWeek: {
    marginTop: 0,
    padding: 10,
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: '#fdfdfd',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#B37EAC',
  },
  body: {
    textAlign: 'left',
    margin: 50,
  },
})