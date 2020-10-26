import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import AddCourseScreen from './screens/AddCourseScreen';
import HomeStackScreen from './screens/HomeStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import TemplateContext from './TemplateContext';
import TemplateScreen from './screens/TemplateScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firebase } from './firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const Tab = createBottomTabNavigator();

export default function App() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref('templates');
    db.on(
      'value',
      (snap) => {
        const templates = snap.val();
        if (templates) {
          // console.info("templates have loaded!", snap.val())
          templates.forEach((template) =>
            template.categories.forEach((category) => {
              category.addedCourses = [];
            })
          );

          setTemplates(templates);
        }
      },
      (error) => console.log(error)
    );
  }, []);
  return (
    <TemplateContext.Provider value={templates}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
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
        </NavigationContainer>
      </PaperProvider>
    </TemplateContext.Provider>
  );
}

