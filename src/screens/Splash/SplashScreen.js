import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
	const [user, setUser] = useState();
	console.log("token =>", user);
	// const user = useSelector((state: any) => state.counter.userData);
	const getToken = async () => {
		setUser(await AsyncStorage.getItem("user"));
	};

	useEffect(() => {
		getToken();
		if (user) {
			let _user = JSON.parse(user);
			console.log("user =>", _user);

			// navigation.navigate("Profile", {
			// 	name: _user?.name,
			// });
			navigation.navigate("StackNavigation", {
				screen: "Profile",
				params: {
					name: "bilal",
				},
			});
		} else {
			navigation.navigate("StackNavigation");
		}
	}, [user]);
	return (
		<View style={styles.splash}>
			<Image
				source={require("../../assets/logo.png")}
				style={styles.logo}
			/>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	splash: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#430064",
	},
	logo: {
		width: wp(70),
		height: hp(40),
	},
});
