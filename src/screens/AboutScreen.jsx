import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { styles } from "../styles/styles";

const AboutScreen = ({ navigation, route }) => {
	// const { itemId, itemTitle } = route.params;

	return (
		<View style={styles.screen}>
			<Text>About Screen</Text>
			{/* <Text>{itemTitle}</Text>
			<Text>{itemId}</Text> */}
			<Button
				mode='contained'
				onPress={() => navigation.navigate("Home")}>
				Go back
			</Button>
			<Button
				mode='contained'
				onPress={() => navigation.setOptions({ title: "Updated !" })}>
				Change Header Title
			</Button>
		</View>
	);
};

export default AboutScreen;
