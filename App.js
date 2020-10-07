import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen'
import AddCategoryScreen from "./screens/AddCategoryScreen";
import TemplateScreen from "./screens/TemplateScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const Stack = createStackNavigator();

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="TemplateScreen" component={TemplateScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
