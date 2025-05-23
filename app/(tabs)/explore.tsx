import { Link } from "expo-router";
import goalTemplates from '@/data/goalTemplates.json';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import InfoGoal from "../../components/InfoGoal";

// image aliases:
// import waterBackground from '../../assets/images/waterBackground.png';

// Dynamically import images
// ⚠️ Make sure to update this when adding new images!! ➡️ "filename.png": require('path/to/image/filename.png'),
const imageMap: { [key: string]: any } = {
    "waterBackground.png": require('@/assets/images/waterBackground.png'),
    "sleepBackground.png": require('@/assets/images/sleepBackground.png')
}

export default function ExploreScreen() {
    return (
        // <View style={styles.container}>
        //     <InfoGoal 
        //     title="Water" 
        //     description="You should really just drink water." 
        //     backgroundImage={waterBackground} 
        //     onAdd={() => console.log("Goal added!")}
        //     />
        //     <Link href='/' style={styles.link}>Back to home</Link>
        // </View>
        <ScrollView>
            <View>
                {goalTemplates.map((goal) => (
                    <InfoGoal
                    key={goal.id}
                    title={goal.title}
                    description={goal.description}
                    backgroundImage={imageMap[goal.image]}
                    onAdd={() => console.log(`Added goal: ${goal.id}`)}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        // flex:  1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    link: {
        textDecorationLine: "underline",
        color:'blue',
        textAlign: 'center',
      },
});