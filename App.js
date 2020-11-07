import {
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import AddCategoryScreen from './screens/AddCategoryScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import CategoryContext from './CategoryContext';
import HomeScreen from './screens/HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import TemplateContext from './TemplateContext';
import TemplateScreen from './screens/TemplateScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebase';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
    primary: '#3498db',
    accent: 'yellow',
  },
};

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref('templates');
    db.on(
      'value',
      (snap) => {
        const templates = snap.val();
        if (templates) {
          // console.info("templates have loaded!", snap.val())
          templates.forEach((template) => {
            if (!template.categories) {
              template.categories = [];
            }
            template.categories.forEach((category) => {
              category.addedCourses = [];
            });
          });

          setTemplates(templates);
        }
      },
      (error) => console.log(error)
    );
  }, []);

  const setCurrentCategories = (categories) => {
    const currentCategories = categories.slice(0);
    setCategories(currentCategories);
  };

  const AddCourseButton = function ({ navigation }) {
    return (
      <Button
        onPress={() => navigation.navigate('AddCourseScreen', { categories })}
      >
        {'Add Course'}
      </Button>
    );
  };

  return (
    <TemplateContext.Provider value={templates}>
      <CategoryContext.Provider value={{ categories, setCurrentCategories }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='TemplateScreen'
                component={TemplateScreen}
                options={{ title: 'Degree Templates' }}
              />
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={({ navigation }) => ({
                  title: 'Degree Progress',
                  headerRight: () => (
                    <AddCourseButton navigation={navigation} />
                  ),
                })}
              />
              <Stack.Screen
                name='AddCategoryScreen'
                component={AddCategoryScreen}
                options={{ title: 'Add Category' }}
              />
              <Stack.Screen
                name='AddCourseScreen'
                component={AddCourseScreen}
                options={{ title: 'Add Course' }}
              />
            </Stack.Navigator>
            {/*<Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

            if (route.name === 'HomeStackScreen') {
              iconName = 'ballot-outline';
            }
            else if (route.name === 'TemplateScreen') {
              iconName = 'bank';
            }
            else if (route.name === 'AddCourseScreen') {
              iconName = 'plus-box-outline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
          }})}
          tabBarOptions={{
            labelPosition: 'below-icon',
            // showLabel: false,
            adaptive: false,
          }} >
            <Tab.Screen
              name='TemplateScreen'
              component={TemplateScreen}
              options={{ title: 'Templates' }}
            />
            <Tab.Screen
              name='AddCourseScreen'
              component={AddCourseScreen}
              options={{ title: 'Add Course' }}
            />
            <Tab.Screen
              name='HomeStackScreen'
              component={HomeStackScreen}
              options={{ title: 'Degree Progress' }}
            />
          </Tab.Navigator>
          */}
          </NavigationContainer>
        </PaperProvider>
      </CategoryContext.Provider>
    </TemplateContext.Provider>
  );
}
