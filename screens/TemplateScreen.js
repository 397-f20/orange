import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Button } from 'react-native-paper';
import TemplateContext from '../TemplateContext';
import PlanContext from '../PlanContext';

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  const { plans, planKey, setPlanKey } = useContext(PlanContext);

  useEffect(() => {
    const db = firebase.database().ref('plans/mockUserId');
    db.on('value',
      (snap) => {
        if (snap.val()) {
          setPlans(snap.val());
        }

      },
      (error) => console.log(error)
    );

  }, []);

  const setCurrentCategories = (categories) => {
    const currentCategories = categories.slice(0);
    setPlanIdx(currentCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, setCurrentCategories }}>
      <SafeAreaView style={styles.container}>
        {plans.map((plan, i) => (
          <Button
            style={styles.buttonStyle}
            key={i}
            onPress={() => {
              setPlanKey(plan);
              navigation.navigate('HomeScreen', { plan })
            }}
          >
            <Text>{template.name}</Text>
          </Button>
        ))}
        {templates.map((template, i) => (
          <Button
            style={styles.buttonStyle}
            key={i}
            onPress={() => {
              const plan = {...template};
              navigation.navigate('HomeScreen', { plan })
            }}
          >
            <Text>{template.name}</Text>
          </Button>
        ))}
      </SafeAreaView>
    </CategoryContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonStyle: {
    marginBottom: 10
  }
});

export default TemplateScreen;
