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
        <Text style={styles.header}>   this week   <SimpleLineIcons name="pencil" size={FONT_SIZE}/></Text>
        <View style={styles.goalsContainer}>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
          <AddGoal onPress={() => router.push('/explore')}></AddGoal>
        </View>
        <Link href='/explore' style={styles.link}>Explore Goals</Link>
        <Text style={styles.body}>this is a different text block.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
  },
  goalsContainer: {
    backgroundColor: 'lightgrey',
    marginTop: 20,
    marginHorizontal: 40,
  },
  header: {
    marginTop: 0,
    padding: 10,
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: 'grey',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
  },
  body: {
    textAlign: 'left',
    margin: 50,
  },
  link: {
    textDecorationLine: "underline",
    color:'blue',
    textAlign: 'center',
  },
})