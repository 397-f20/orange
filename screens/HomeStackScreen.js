import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddCategoryScreen from "./AddCategoryScreen";

const Stack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
