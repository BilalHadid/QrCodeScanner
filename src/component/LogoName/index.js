import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { logo } from "../../theme/theme";

const index = () => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#430064",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <Image
        source={logo}
        style={{ height: 150, width: 150, marginTop: 30, marginBottom: 30 }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
