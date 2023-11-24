import React from "react";
import { View, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const MeteoScreen = ({ route, navigation }) => {
	const [loading, setLoading] = React.useState(false);
	const { city } = route.params;
	const [data, setData] = React.useState();

	const API_KEY = "wd1m2cacHhIDqPnlXsqBGw==zrfEMuKmaO0dkJD2";

	useFocusEffect(
		React.useCallback(() => {
			console.log(city);
			fetchWeather();
		}, [])
	);

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

	return (
		<View>
			<Text style={{ fontSize: 24 }}>Meteo de {city}</Text>
			{data && <Text>{data.temp}</Text>}
		</View>
	);
};
export default MeteoScreen;
