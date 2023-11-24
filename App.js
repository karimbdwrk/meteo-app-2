import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	Button as NativeBtn,
	StyleSheet,
	Text,
	View,
	Platform,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import AboutScreen from "./src/screens/AboutScreen";
import GeoDataScreen from "./src/screens/GeoDataScreen";
import MeteoScreen from "./src/screens/MeteoScreen";
import WeatherScreen from "./src/screens/WeatherScreen";
import MapScreen from "./src/screens/MapScreen";
import QrCodeScreen from "./src/screens/QrCodeScreen";
import ImageDetectionScreen from "./src/screens/ImageDetectionScreen";

// import { styles } from "./src/styles/styles";

export default function App() {
	const Stack = createNativeStackNavigator();

	const headerConfig = {
		headerStyle: {
			backgroundColor: "#FFF",
		},
	};

	const Logo = () => (
		<Image
			style={{ width: 30, height: 30 }}
			source={require("./assets/icone-meteo-noir.png")}
		/>
	);

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='auto' />
			<SafeAreaView
				style={[
					styles.container,
					{
						paddingTop:
							Platform.OS != "ios"
								? 0
								: Constants.statusBarHeight,
					},
				]}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={headerConfig}>
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{
								headerTitle: (props) => <Logo {...props} />,
								headerRight: () => (
									<NativeBtn
										title='Btn'
										color='#000'
										onPress={() => alert("Btn clicked !")}
									/>
								),
								headerTitleAlign: "center",
							}}
						/>
						<Stack.Screen
							name='GeoData'
							component={GeoDataScreen}
							options={{
								title: "Geo Data page",
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "100",
								},
							}}
						/>
						<Stack.Screen
							name='Meteo'
							component={MeteoScreen}
							options={{
								title: "Meteo page",
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "100",
								},
							}}
						/>
						<Stack.Screen
							name='Weather'
							component={WeatherScreen}
							options={{
								title: "Weather page",
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "100",
								},
							}}
						/>
						<Stack.Screen name='QrCode' component={QrCodeScreen} />
						<Stack.Screen
							name='Image'
							component={ImageDetectionScreen}
						/>
					</Stack.Navigator>
					{/* <Tab.Navigator
						initialRouteName='home'
						screenOptions={{
							tabBarActiveTintColor: "#000",
							tabBarInactiveTintColor: "#BBB",
							tabBarActiveBackgroundColor: "pink",
							tabBarInactiveBackgroundColor: "yellow",
						}}>
						<Tab.Screen
							name='Home'
							component={HomeScreen}
							options={{
								tabBarLabel: "Accueil",
								tabBarIcon: () => (
									<Icon name='home' size={20} />
								),
							}}
						/>
						<Tab.Screen
							name='About'
							component={AboutScreen}
							options={{
								tabBarIcon: () => (
									<Icon name='message' size={20} />
								),
								tabBarBadge: 3,
							}}
						/>
						<Tab.Screen
							name='GeoData'
							component={GeoDataScreen}
							options={{
								tabBarIcon: () => (
									<Icon name='globe' size={20} />
								),
							}}
						/>

						<Tab.Screen
							name='Meteo'
							component={MeteoScreen}
							options={{
								tabBarIcon: () => (
									<Icon name='layers' size={20} />
								),
							}}
						/>
						<Tab.Screen
							name='Map'
							component={MapScreen}
							options={{
								tabBarIcon: () => (
									<Icon name='layers' size={20} />
								),
							}}
						/>
					</Tab.Navigator> */}
				</NavigationContainer>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	container: {
		flex: 1,
		flexDirection: "column",
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
		// padding: 15,
	},
	box: {
		// height: 100,
		// width: 100,
		flex: 1,
	},
});
