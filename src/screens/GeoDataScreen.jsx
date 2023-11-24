import React from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, TextInput, Card } from "react-native-paper";

import Title from "../components/Title";

import { styles } from "../styles/styles";

const GeoDataScreen = ({ navigation }) => {
	const [cities, setCities] = React.useState([]);
	const [city, setCity] = React.useState("");
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const API_KEY = "wd1m2cacHhIDqPnlXsqBGw==zrfEMuKmaO0dkJD2";

	// storing data
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("cities", JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	//getting data
	const getData = async () => {
		try {
			const citiesData = JSON.parse(await AsyncStorage.getItem("cities"));
			setCities(citiesData);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		// console.log(data);
		getData();
	}, []);

	React.useEffect(() => {
		// console.log(data);
		if (data && cities) {
			const newCities = [...cities, data[0]];
			setCities(newCities);
			storeData(newCities);
		} else if (data && !cities) {
			const newCities = [data[0]];
			setCities(newCities);
			storeData(newCities);
		}
	}, [data]);

	const handleDelete = (cityName) => {
		const updatedCities = cities.filter((c) => c.name != cityName);
		setCities(updatedCities);
		storeData(updatedCities);
	};

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://api.api-ninjas.com/v1/geocoding?city=${city}`,
				{
					headers: {
						"X-Api-Key": API_KEY,
						contentType: "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setLoading(false);
			if (dataJson.length == 0) {
				setError("Cette ville n'existe pas Hmar !");
				// console.error("Cette ville n'existe pas Hmar !");
			} else {
				setData(dataJson);
				setError("");
			}
			// console.log("datajson : ", dataJson);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const fetchWeather = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://api.api-ninjas.com/v1/weather?city=${city}`,
				{
					headers: {
						"X-Api-Key": API_KEY,
						contentType: "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setData(dataJson);
			setLoading(false);
			console.log("datajson : ", dataJson);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleSubmit = () => {
		if (city && !cities) {
			fetchData();
			setCity("");
			setError("");
		} else if (city) {
			const result = cities.filter((c) => c.name === city);
			// console.log(city);
			console.log(result);
			if (result.length === 0) {
				fetchData();
				setCity("");
				setError("");
			} else {
				setError("La ville existe deja");
			}
		} else {
			setError("Vide");
		}
	};

	return (
		<View style={styles.screen}>
			{/* <Title content='GeoData Screen' couleur='red' size={32} /> */}
			<View style={{ flex: 4, width: "100%", padding: 15 }}>
				<FlatList
					data={cities}
					keyExtractor={() => Math.random()}
					renderItem={({ item }) => (
						<>
							<Card
								mode='outlined'
								style={{ width: "100%", marginBottom: 10 }}>
								<Card.Title
									title={
										<Text style={{ fontSize: 24 }}>
											{item.name}
										</Text>
									}
									// subtitle='Card Subtitle'
									// left={(props) => (
									// 	<Avatar.Icon {...props} icon='folder' />
									// )}
									// right={(props) => (
									// 	<IconButton
									// 		{...props}
									// 		icon='dots-vertical'
									// 		onPress={() => {}}
									// 	/>
									// )}
								/>
								<Card.Actions>
									<Button
										mode='outlined'
										onPress={() =>
											navigation.navigate("Meteo", {
												city: item.name,
											})
										}>
										Voir Meteo
									</Button>
									<Button
										mode='contained'
										onPress={() => handleDelete(item.name)}>
										X
									</Button>
								</Card.Actions>
							</Card>
						</>
					)}
				/>
				{loading && <Text style={{ color: "#FFF" }}>Loading ...</Text>}
			</View>
			<View style={{ flex: 1, width: "100%", padding: 15 }}>
				{error && <Text style={styles2.error}>{error}</Text>}
				{/* <TextInput
					style={styles2.input}
					placeholder='city'
					onChangeText={setCity}
					value={city}
				/> */}
				<TextInput
					mode='outlined'
					label='city'
					value={city}
					onChangeText={setCity}
					style={{ marginBottom: 10 }}
				/>
				<Button mode='contained' onPress={handleSubmit}>
					Send
				</Button>
			</View>
		</View>
	);
};

const styles2 = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#FFF",
		width: "100%",
		color: "#FFF",
		height: 50,
		marginBottom: 15,
		paddingHorizontal: 15,
	},
	card: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#FFF",
		padding: 30,
		marginBottom: 15,
	},
	error: {
		color: "red",
		fontSize: 24,
	},
});

export default GeoDataScreen;
