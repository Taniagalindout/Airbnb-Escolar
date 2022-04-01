import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Top from "../screens/Top";
const Stack = createStackNavigator();
export default function TopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#FF5A60" },
      }}>
          <Stack.Screen
           name="profileStack"
           component={Top}
           options={{ title: "Top 5" }}
          />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
