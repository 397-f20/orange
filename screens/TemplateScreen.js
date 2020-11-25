import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

import { Button, IconButton, Surface, Appbar } from 'react-native-paper';
import TemplateContext from '../TemplateContext';
import PlanContext from '../PlanContext';
import DeleteDialog from '../components/DeleteDialog';

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  const { plans, setPlans, setPlanKey } = useContext(PlanContext);
  const [isVisible, setIsVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState('');
  const [section, setSection] = useState("Saved Plans");

  const onDeletePlan = () => {
    const newPlans = { ...plans };
    delete newPlans[planToDelete];
    setPlans(newPlans);
    setIsVisible(false);
  }

  const SavedPlans = (
    <Surface style={styles.degreeList}>
      {Object.entries(plans).map(planObj => (
        <View
          style={styles.savedPlans}
          key={planObj[0]}
        >
          <IconButton icon='close-circle' color='grey' size={20}
            onPress={() => {
              setIsVisible(true);
              setPlanToDelete(planObj[0])
            }} />
          <Button
            style={styles.buttonStyle}
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
  );

  const Templates = (
    <Surface style={styles.degreeList}>
      {templates.map((template, i) => (
        <Button
          style={styles.buttonStyle}
          key={i}
          onPress={() => {
            setPlans({ ...plans, [template.name]: template.categories })
            navigation.navigate('HomeScreen', {})
            setPlanKey(template.name)
            navigation.navigate('HomeScreen', {})
          }}
        >
          <Text>{template.name}</Text>
        </Button>
      ))}
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar >
        <Appbar.Content
          style={styles.AppBar}
          titleStyle={section === "Saved Plans" ? styles.selectedSection : styles.deselectedSection}
          title="Saved Plans"
          onPress={() => {
            setSection("Saved Plans");
          }} />
        <Appbar.Content
          style={styles.AppBar}
          titleStyle={section === "Templates" ? styles.selectedSection : styles.deselectedSection}
          title="Templates"
          onPress={() => {
            setSection("Templates");
          }} />
      </Appbar>

      {section === "Saved Plans" ? SavedPlans : Templates}

      <View style={styles.logoContainer}>
        <Image
          source={require("../resources/ReqTrack.png")}
        />
      </View>

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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%"
  },
  buttonStyle: {
    marginVertical: 5
  },
  templatesStyle: {
    marginTop: 10
  },
  savedPlans: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  degreeList: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center"
  },
  selectedSection: {
    color: 'white',
    fontWeight: '700',
  },
  deselectedSection: {
    color: 'white',
    fontWeight: '300',
  },
  AppBar: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default TemplateScreen;
