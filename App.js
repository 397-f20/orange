import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { HeaderBackButton, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import AddCategoryScreen from './screens/AddCategoryScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import CategoryContext from './CategoryContext';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import TemplateContext from './TemplateContext';
import PlanContext from './PlanContext';
import TemplateScreen from './screens/TemplateScreen';
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

const Stack = createStackNavigator();

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [planKey, setPlanKey] = useState(null);
  const [plans, setPlans] = useState({});
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   let uId;
  //   try {
  //     uId = await AsyncStorage.getItem('userId');
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   if (uId) setUserId(uId);
  //   else {
  //     firebase.auth().signInAnonymously()
  //     .then(() => {
  //       // Signed in..
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // ...
  //     })
  //   }

  // })

  useEffect(() => {
    const db = firebase.database().ref('templates');
    db.on(
      'value',
      (snap) => {
        const templates = snap.val();
        if (templates) {
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

  useEffect(() => {
    const db = firebase.database().ref('plans/mockUserId');
    db.on('value',
      (snap) => {
        if (snap.val()) {
          setPlans(snap.val());
          console.info(snap.val());
        }

      },
      (error) => console.log(error)
    );

  }, []);

  const AddCourseButton = function ({ navigation }) {
    return <Button onPress={() => navigation.navigate('AddCourseScreen', { categories })}>{'Add Course'}</Button>;
  };

  return (
    <TemplateContext.Provider value={templates}>
      <PlanContext.Provider value={{plans, setPlans, planKey, setPlanKey}}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='TemplateScreen' component={TemplateScreen} options={{ title: 'Degree Templates' }} />
                <Stack.Screen
                  name='HomeScreen'
                  component={HomeScreen}
                  options={({ navigation }) => ({
                    title: 'Degree Progress',
                    headerBackTitleVisible: false,
                    headerRight: () => <AddCourseButton navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name='AddCategoryScreen'
                  component={AddCategoryScreen}
                  options={{ title: 'Add Category', headerBackTitleVisible: false }}
                />
                <Stack.Screen
                  name='AddCourseScreen'
                  component={AddCourseScreen}
                  options={{ title: 'Add Course', headerBackTitleVisible: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
      </PlanContext.Provider>
    </TemplateContext.Provider>
  );
}
