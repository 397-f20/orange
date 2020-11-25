import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button, Headline, IconButton, Surface } from 'react-native-paper';
import TemplateContext from '../TemplateContext';
import PlanContext from '../PlanContext';
import DeleteDialog from '../components/DeleteDialog';


const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  const { plans, setPlans, setPlanKey } = useContext(PlanContext);
  const [isVisible, setIsVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState('');

  const onDeletePlan = () => {
    const newPlans = { ...plans };
    delete newPlans[planToDelete];
    setPlans(newPlans);
    setIsVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Surface>
        <Headline style={styles.centered}>Saved Plans</Headline>
        {Object.entries(plans).map(planObj => (

          <View style={styles.savedPlans}>
            <IconButton icon='close-circle' color='grey' size={20}
              onPress={() => {
                setIsVisible(true);
                setPlanToDelete(planObj[0])
              }} />
            <Button
              style={styles.buttonStyle}
              key={planObj[0]}
              onPress={() => {
                setPlanKey(planObj[0]);
                console.info("setting plan key to ", planObj[0], planObj[1])
                navigation.navigate('HomeScreen', {})
              }}
            >
              <Text>{planObj[0]}</Text>
            </Button>
          </View>
        ))}
      </Surface>
      <Surface style={styles.templatesStyle}>
        <Headline style={styles.centered}>Templates</Headline>
        {templates.map((template, i) => (
          <Button
            style={styles.buttonStyle}
            key={i}
            onPress={() => {
              setPlans({ ...plans, [template.name]: template.categories })
              navigation.navigate('HomeScreen', {})
              setPlanKey(template.name)
              navigation.navigate('HomeScreen',  {})
            }}
          >
            <Text>{template.name}</Text>
          </Button>
        ))}
      </Surface>
      {isVisible && (
        <DeleteDialog
          dialogText='Do you want to delete this plan?'
          hideDialog={() => setIsVisible(false)}
          onDelete={onDeletePlan}
          visible={isVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonStyle: {
    marginBottom: 10
  },
  savedPlans: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  templatesStyle: {
    marginTop: 10
  }
});

export default TemplateScreen;
