import React from "react";
import { View, FlatList } from "react-native";
import { Button, Text, ProgressBar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";

const WeatherScreen = ({ route, navigation }) => {
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
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed48a34f8d27959074824d85648fa4a6`,
				{
					headers: {
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

	const IconWeather = ({ pct }) => {
		if (pct < 25) {
			return <Icon name='sunny' size={48} />;
		} else if (pct < 50 && pct >= 25) {
			return <Icon name='partly-sunny' size={48} />;
		} else if (pct < 75 && pct >= 50) {
			return <Icon name='cloudy' size={48} />;
		} else if (pct <= 100 && pct >= 75) {
			return <Icon name='rainy' size={48} />;
		}
	};

	return (
		<View>
			{/* <Text style={{ fontSize: 24 }}>Meteo de {city}</Text> */}
			<Text variant='displayMedium'>Meteo de {city}</Text>

			{loading ? (
				<Text>Loading ...</Text>
			) : (
				<View style={{ padding: 15 }}>
					{/* {data && (
						<>
							<IconWeather pct={data.cloud_pct} />
							<Text variant='headlineMedium'>
								{data.temp + "°C"}
							</Text>
							<Text>Humidity</Text>
							<ProgressBar
								progress={data.humidity / 100}
								color={"#000"}
							/>
						</>
					)} */}
					{data && <Text>{data.weather[0].main}</Text>}
					<Button onPress={() => navigation.goBack()}>Retour</Button>
				</View>
			)}
		</View>
	);
};

export default WeatherScreen;
