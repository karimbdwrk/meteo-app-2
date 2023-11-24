import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";

// const fs = require("fs");

export default function ImageDetectionScreen() {
	// const FormData = require("form-data");
	const [loading, setLoading] = React.useState(false);
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	const API_KEY = "1764df9331msh5e512dad9f53d86p145b92jsn4596e24bf83f";

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === "granted");
		})();
	}, []);

	useEffect(() => {
		if (image) fetchImg();
	}, [image]);

	const fetchImg = async () => {
		try {
			setLoading(true);
			console.log(image);

			const data = new FormData();
			data.append("model", "detect");
			data.append("image", image);

			const response = await fetch(
				"https://object-detection1.p.rapidapi.com/detect",
				{
					method: "POST",
					headers: {
						"X-RapidAPI-Key":
							"bc70aef057msh4ed271859f0bdd7p11261fjsn55b3a62921ee",
						"X-RapidAPI-Host": "object-detection1.p.rapidapi.com",
						// contentType: "multipart/form-data",
					},
					body: data,
				}
			);
			const dataJson = await response.json();
			// setData(dataJson);
			setLoading(false);
			console.log("datajson : ", dataJson);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setImage(data.uri);
		}
	};

	if (hasCameraPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.cameraContainer}>
				<Camera
					ref={(ref) => setCamera(ref)}
					style={styles.fixedRatio}
					type={type}
					ratio={"1:1"}
				/>
			</View>
			<Button
				title='Flip Image'
				onPress={() => {
					setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					);
				}}></Button>
			<Button title='Take Picture' onPress={() => takePicture()} />
			{image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
		</View>
	);
}
const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1,
	},
});
