import React, { useState } from 'react';
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
    primary: '#3498db',
    accent: 'yellow',
  },
};

const Stack = createStackNavigator();

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="TemplateScreen" component={TemplateScreen} options={{ title: 'Select Degree' }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Degree Progress' }} />
            <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} options={{ title: 'Add Category' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
