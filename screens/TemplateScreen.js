import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Button, Headline } from 'react-native-paper';
import TemplateContext from '../TemplateContext';
import PlanContext from '../PlanContext';

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  const { plans,  setPlans, setPlanKey } = useContext(PlanContext);

  return (
      <SafeAreaView style={styles.container}>
        <Headline >Saved Plans</Headline>
        {Object.entries(plans).map(planObj => (
          <Button
            style={styles.buttonStyle}
            key={planObj[0]}
            onPress={() => {
              setPlanKey(planObj[0]);
              console.info("setting plan key to ",planObj[0], planObj[1])
              navigation.navigate('HomeScreen', {})
            }}
          >
            <Text>{planObj[0]}</Text>
          </Button>
        ))}
        <Headline >Templates</Headline>
        {templates.map((template, i) => (
          <Button
            style={styles.buttonStyle}
            key={i}
            onPress={() => {
              console.info("setting plans to ", {...plans, [template.name]: template.categories})
              setPlans({...plans, [template.name]: template.categories})
              navigation.navigate('HomeScreen',  {})
              setPlanKey(template.name)
            }}
          >
            <Text>{template.name}</Text>
          </Button>
        ))}
      </SafeAreaView>
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
