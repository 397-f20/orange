import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import TemplateContext from './TemplateContext'
import HomeStackScreen from "./screens/HomeStackScreen";
import AddCourseScreen from "./screens/AddCourseScreen";
import TemplateScreen from "./screens/TemplateScreen";
import { firebase } from './firebase'

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
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    const db = firebase.database().ref('templates');
    db.on('value', snap => {
      if (snap.val()) {
        console.info("templates have loaded!", snap.val())
        setTemplates(snap.val());
      }
    }, error => console.log(error));
  }, []);
  return (
      <TemplateContext.Provider templates={templates}>
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
    </TemplateContext.Provider>
  );
}
