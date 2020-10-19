import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import AddCourseScreen from './screens/AddCourseScreen';
import HomeStackScreen from './screens/HomeStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import TemplateContext from './TemplateContext';
import TemplateScreen from './screens/TemplateScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
          <Tab.Navigator>
            <Tab.Screen
              name='TemplateScreen'
              component={TemplateScreen}
              options={{ title: 'Select Degree' }}
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
