import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import TemplateScreen from "./screens/TemplateScreen";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    text: "black",
    primary: "#3498db",
    accent: "yellow"
  }
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="TemplateScreen"
            component={TemplateScreen}
            options={{ title: "Select Degree" }}
          />
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Degree Progress" }}
          />
          <Tab.Screen
            name="AddCategoryScreen"
            component={AddCategoryScreen}
            options={{ title: "Add Category" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
