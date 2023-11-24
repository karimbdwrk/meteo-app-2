import React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

const QrCodeScreen = () => {
	const [url, setUrl] = React.useState("");
	const [qrCodeData, setQrCodeData] = React.useState("");

	const convertToQRCode = () => {
		setQrCodeData(url);
	};

	return (
		<View>
			<Text>QRCode Screen</Text>
			{qrCodeData && <Text>{qrCodeData}</Text>}
			<View>
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
