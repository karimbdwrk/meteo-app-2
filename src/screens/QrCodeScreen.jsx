import React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

import { styles } from "../styles/styles";

const QrCodeScreen = () => {
	const [url, setUrl] = React.useState("");
	const [qrCodeData, setQrCodeData] = React.useState("");

	const convertToQRCode = () => {
		setQrCodeData(url);
	};

	return (
		<View style={styles.screen}>
			<View style={{ flex: 2 }}>
				<Text>QRCode Screen</Text>
				{qrCodeData && <QRCode value={qrCodeData} size={200} />}
			</View>
			<View style={{ flex: 1 }}>
				<TextInput
					value={url}
					onChangeText={(txt) => setUrl(txt)}
					placeholder='url'
				/>
				<Button onPress={convertToQRCode}>Convert</Button>
			</View>
		</View>
	);
};

export default QrCodeScreen;
