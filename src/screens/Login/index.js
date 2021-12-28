import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Alert,
	ActivityIndicator,
	ScrollView,
	Dimensions,
} from "react-native";
import LogoName from "../../component/LogoName/index";
import Button from "../../component/Button/index";
import { State, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { color, event } from "react-native-reanimated";
import { useEffect } from "react/cjs/react.development";
import { useDispatch, useSelector } from "react-redux";
import { Password, Username } from "../../redux/loginSlice";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";
import firebase from "../../../firebaseConfig";
import Api from "../../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast, Root } from "native-base";

const index = ({ navigation }) => {
	const [userName, setuserName] = useState("");
	const [password, setPassword] = useState("");
	const [load, setload] = useState(false);

	const dispatch = useDispatch();

	const login = async () => {
		setload(true);

		// console.log("Login", userName, password);
		let item = {
			email: userName,
			password: password,
		};
		await fetch(`${Api.BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then(async (result) => {
				setload(false);
				if (result.success == true) {
					Toast.show({
						text: "Sucess",
						position: "bottom",
						type: "success",
					});
					await AsyncStorage.setItem(
						"user",
						JSON.stringify(result.data)
					);
					navigation.navigate("Profile", {
						name: result.data.name,
					});
				} else {
					Toast.show({
						text: result.msg,
						position: "bottom",
						type: "danger",
					});
					// Alert.alert(result.msg);
				}
				console.log("Result", result);
			});
	};

	return (
		<Root>
			<ScrollView>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#430064",
						height: "100%",
					}}
				>
					<View
						style={{
							marginTop: 100,
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "row",
							width: Dimensions.get("screen").width,
							paddingLeft: "5%",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.goBack();
							}}
						>
							<Image
								source={require("../../assets/arrow.png")}
								style={{ height: 20, width: 30, marginTop: 70 }}
							/>
						</TouchableOpacity>
					</View>
					<Image
						source={require("../../assets/logo.png")}
						style={{ height: 330, width: 350, marginTop: 10 }}
					/>

					<View
						style={{
							backgroundColor: "white",
							padding: 40,
							height: "50%",
							borderRadius: 50,
						}}
					>
						<View
							style={{
								// width: 320,
								padding: 10,
							}}
						>
							<TextInput
								value={userName}
								placeholderTextColor="white"
								style={{
									fontSize: 19,
									padding: 15,
									color: "white",
									width: Dimensions.get("screen").width / 1.2,

									borderRadius: 20,
									backgroundColor: "#430064",
								}}
								placeholder="Username"
								onChangeText={(text) => setuserName(text)}
							/>
						</View>
						<View style={{ padding: 10 }}>
							<TextInput
								style={{
									fontSize: 19,
									padding: 15,
									color: "white",
									width: Dimensions.get("screen").width / 1.2,
									borderRadius: 20,
									backgroundColor: "#430064",
								}}
								placeholder="password"
								placeholderTextColor="white"
								value={password}
								secureTextEntry={true}
								onChangeText={(text) => setPassword(text)}
							/>
						</View>

						<View
							style={{
								// flexDirection: "row",
								marginTop: -20,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<TouchableOpacity
								onPress={() => {
									login();
								}}
							>
								<View style={{}}>
									<Button
										name={
											load ? (
												<ActivityIndicator
													size={"large"}
													color="#430064"
												/>
											) : (
												"Login"
											)
										}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</Root>
	);
};

export default index;

const styles = StyleSheet.create({});
