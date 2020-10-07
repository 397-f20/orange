import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'
import AddCategoryScreen from "./screens/AddCategoryScreen";
import TemplateScreen from "./screens/TemplateScreen";


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="TemplateScreen" component={TemplateScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
