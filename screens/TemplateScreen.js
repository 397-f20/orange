import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Button, Caption, IconButton, Card, Surface } from 'react-native-paper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TemplateContext from '../TemplateContext';
import PlanContext from '../PlanContext';
import DeleteDialog from '../components/DeleteDialog';

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  const { plans, setPlans, setPlanKey } = useContext(PlanContext);
  const [isVisible, setIsVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState('');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Saved Plans' },
    { key: 'second', title: 'Templates' },
  ]);

  const onDeletePlan = () => {
    const newPlans = { ...plans };
    delete newPlans[planToDelete];
    setPlans(newPlans);
    setIsVisible(false);
  }

  const DefaultPlans = () => (
    <Card style={styles.defaultPlans}>
      <Caption style={styles.defaultText}>
        CHOOSE AN EXISTING TEMPLATE TO START A DEGREE PLAN
      </Caption>
    </Card>
  );

  const SavedPlans = () => (
    <Surface style={styles.degreeList}>
      {Object.entries(plans).map(planObj => (
        <View
          style={styles.savedPlans}
          key={planObj[0]}
        >
          <Button
            style={styles.buttonStyle}
            onPress={() => {
              setPlanKey(planObj[0]);
              navigation.navigate('HomeScreen', {})
            }}
          >
            <Text>{planObj[0]}</Text>
          </Button>
          <IconButton style={styles.deleteButton} icon='close-circle' color='grey' size={20}
            onPress={() => {
              setIsVisible(true);
              setPlanToDelete(planObj[0])
            }} />
        </View>
      ))}
    </Surface>
  );

  const Templates = () => (
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

  const initialLayout = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  };

  const renderScene = SceneMap({
    first: Object.keys(plans).length === 0 && plans.constructor === Object ? DefaultPlans : SavedPlans,
    second: Templates,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBar}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}

      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.imageStyle}
          source={require("../resources/CatTracksLogo.png")}
          resizeMode="contain"
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
  deleteButton: {
    marginLeft: 'auto',
    marginRight: 10
  },
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
  },
  imageStyle: {
    width: '60%',
    opacity: 1
  },
  buttonStyle: {
    marginVertical: 6,
  },
  templatesStyle: {
    marginTop: 10
  },
  savedPlans: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  degreeList: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#573280"
  },
  tabBarIndicator: {
    backgroundColor: '#FC6DAB'
  },
  defaultPlans: {
    padding: 50,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#23022E'
  },
  defaultText: {
    textAlign: 'center'
  }
});

export default TemplateScreen;
