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
const unallocated = {
  name: 'Unallocated',
  total: null,
  addedCourses: [],
  futureCourses: []
};

const Stack = createStackNavigator();

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [planKey, setPlanKey] = useState(null);
  const [plans, setPlans] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const db = firebase.database().ref('plans/mockUserId');
    db.on('value', (snap) => {
      const plans = snap.val();
      Object.values(plans).forEach((plan) => {
        plan.forEach((category) => {
          category.addedCourses = category.addedCourses || [];
          category.futureCourses = category.futureCourses || [];
        })
      })
      setPlans(plans)

      },
      (error) => console.log(error)
    );

  }, []);


  useEffect(() => {
    const db = firebase.database().ref('templates');
    db.on(
      'value',
      (snap) => {
        const templates = snap.val();
        if (templates) {
          templates.forEach((template) => {
            if (!template.categories) {
              template.categories = [unallocated];
            } else {
              template.categories.unshift(unallocated);
            }
            template.categories.forEach((category) => {
              category.addedCourses = [];
              category.futureCourses = [];
            });
          });

          setTemplates(templates);
        }
      },
      (error) => console.log(error)
    );
  }, []);

  const AddCourseButton = function ({ navigation }) {
    return <Button onPress={() => navigation.navigate('AddCourseScreen', {})}>{'Add Course'}</Button>;
  };

  const setCurrentPlan = (updatedPlan) => {
    console.log("in set current plan")
    const plansWithUpdatedCategory = {...plans, [planKey]: updatedPlan};
    setPlans(plansWithUpdatedCategory)
    try {
      firebase.database().ref(`plans/mockUserId/${planKey}`).set(updatedPlan,
          (error) => console.log(error));
    } catch (e) {
      console.error(e);
    }
  };

  const currentPlan = plans[planKey]

  return (
    <TemplateContext.Provider value={templates}>
      <PlanContext.Provider value={{plans, setPlans, planKey, setPlanKey, currentPlan, setCurrentPlan}}>
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
