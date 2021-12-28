import React, { useEffect, useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	Dimensions,
	Platform,
} from "react-native";
import {
	State,
	TextInput,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Profile } from "../../theme/theme";
import Button from "../../component/Button/index";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const index = ({ route }) => {
	//Params
	const { name } = route.params;

	//For Push Notification
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(
				responseListener.current
			);
		};
	}, []);

	//For Scanned Bar code

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		await schedulePushNotification(data);
		setScanned(true);

		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return (
			<View
				style={{
					height: Dimensions.get("screen").height,
					backgroundColor: "#430064",
					flex: 1,
					justifyContent: "center",
					alignItem: "center",
				}}
			>
				<Text style={{ color: "white" }}>
					Plz Wait Requesting for camera permission
				</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View
			style={{
				backgroundColor: "#430064",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ fontSize: 40, color: "white" }}>{name}</Text>
			<Text style={{ fontSize: 20, fontWeight: "100", color: "white" }}>
				Welcome to ShopeMe{" "}
			</Text>
			{/* <View style={{ alignItems: "center", backgroundColor: "#430064" }}> */}
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={{
					height: Dimensions.get("screen").height / 2,
					width: "90%",
				}}
			/>
			{scanned && (
				<Button
					name={"Tap to Scan Again"}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	);
};

export default index;

async function schedulePushNotification(data) {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Qr Code Scanned",
			body: data,
			data: { data: "goes here" },
		},
		trigger: { seconds: 1 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
}
