import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen/index";
import Profile from "../screens/Profile/index";
import SignUp from "../screens/SignUp/index";
import Login from "../screens/Login/index";
import LogoName from "../component/LogoName/index";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogoName" component={LogoName} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
