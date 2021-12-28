import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigations/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
	return (
		<>
    {/* provider is used for redux */}
			<Provider store={store}>
        {/* Navigation Container for Navigation and wrap all the app */}
				<NavigationContainer>
					<RootNavigator />
				</NavigationContainer>
			</Provider>

			{/* <StatusBar style="auto" /> */}
		</>
	);
}
