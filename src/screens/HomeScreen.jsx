import React from "react";
import { Text, View, Image } from "react-native";
import { Button, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AboutScreen from "./AboutScreen";
import GeoDataScreen from "./GeoDataScreen";
import MeteoScreen from "./MeteoScreen";
import MapScreen from "./MapScreen";
import QrCodeScreen from "./QrCodeScreen";
import ImageDetectionScreen from "./ImageDetectionScreen";

import { styles } from "../styles/styles";

const HomeScreen = ({ navigation }) => {
	const Tab = createBottomTabNavigator();

	return (
		<>
			<Tab.Navigator
				initialRouteName='Home'
				screenOptions={{
					tabBarActiveTintColor: "#000",
					tabBarInactiveTintColor: "#BBB",
					tabBarActiveBackgroundColor: "#E7E7E7",
					tabBarInactiveBackgroundColor: "#FFF",
				}}>
				<Tab.Screen
					name='GeoData'
					component={GeoDataScreen}
					options={{
						tabBarIcon: () => <Icon name='globe' size={20} />,
					}}
				/>
				<Tab.Screen
					name='About'
					component={AboutScreen}
					options={{
						tabBarIcon: () => <Icon name='message' size={20} />,
						tabBarBadge: 3,
					}}
				/>
				<Tab.Screen
					name='QrCode'
					component={QrCodeScreen}
					options={{
						tabBarIcon: () => <Icon name='v-card' size={20} />,
					}}
				/>
				<Tab.Screen
					name='Image'
					component={ImageDetectionScreen}
					options={{
						tabBarIcon: () => <Icon name='image' size={20} />,
					}}
				/>

				{/* <Tab.Screen
					name='Meteo'
					component={MeteoScreen}
					options={{
						tabBarIcon: () => <Icon name='layers' size={20} />,
					}}
				/>
				<Tab.Screen
					name='Map'
					component={MapScreen}
					options={{
						tabBarIcon: () => <Icon name='layers' size={20} />,
					}}
				/> */}
			</Tab.Navigator>
		</>
	);
};

export default HomeScreen;
