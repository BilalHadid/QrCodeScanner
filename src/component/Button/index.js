import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Touchable,
	Dimensions,
} from "react-native";
import { color } from "react-native-reanimated";
// import styelss from '../../theme/theme'

const index = ({ name }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<View style={styles.textConteiner}>
					<Text style={styles.textStyle}>{name}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
	},
	textConteiner: {
		padding: "3%",
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		width: Dimensions.get("screen").width / 1.2,
		borderWidth: 1,
		borderColor: "#430064",
	},
	textStyle: {
		fontSize: 20,
		color: "#430064",
		fontWeight: "bold",
	},
});
