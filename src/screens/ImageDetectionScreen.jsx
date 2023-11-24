import React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

import { styles } from "../styles/styles";

const ImageDetectionScreen = () => {
	const [hasPermission, setHasPermission] = React.useState(null);

	// const convertToQRCode = () => {
	// 	setQrCodeData(url);
	// };

	return (
		<View style={styles.screen}>
			<View style={{ flex: 2 }}>
				<Text>Image detection Screen</Text>
			</View>
			<View style={{ flex: 1 }}></View>
		</View>
	);
};

export default ImageDetectionScreen;
