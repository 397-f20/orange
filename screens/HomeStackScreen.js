import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import HomeScreen from './HomeScreen';
import AddCategoryScreen from './AddCategoryScreen';

const Stack = createStackNavigator();

const HomeStackScreen = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HomeStackScreen;
