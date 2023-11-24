import React from "react";
import { View, Text } from "react-native";

const Title = ({ content, couleur, size }) => {
	return (
		<View>
			<Text style={{ color: couleur, fontSize: size }}>{content}</Text>
		</View>
	);
};

export default Title;
