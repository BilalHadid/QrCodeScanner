import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import Splash from "../screens/splash/index";
import StackNavigation from "../../src/navigations/StackNavigation";
import SplashScreen from "../screens/Splash/SplashScreen";

const Stack = createStackNavigator();
const RootNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
			<Stack.Screen name="SplashScreen" component={SplashScreen} />
			<Stack.Screen name="StackNavigation" component={StackNavigation} />
		</Stack.Navigator>
	);
};

export default RootNavigator;
