import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import HomeStackScreen from "./screens/HomeScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import AddCourseScreen from "./screens/AddCourseScreen";
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
            name="AddCourseScreen"
            component={AddCourseScreen}
            options={{ title: "Add Course" }}
          />
          <Tab.Screen
            name="HomeStackScreen"
            component={HomeStackScreen}
            options={{ title: "Degree Progress" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
