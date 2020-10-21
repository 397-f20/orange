import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Button } from 'react-native-paper';
import TemplateContext from '../TemplateContext';

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext);
  return (
    <SafeAreaView style={styles.container}>
      {templates.map((template, i) => (
        <Button
          style={styles.buttonStyle}
          key={i}
          onPress={() =>
            navigation.navigate('HomeStackScreen', {
              screen: 'HomeScreen',
              params: { template },
            })
          }
        >
          <Text>{template.name}</Text>
        </Button>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
  },
  buttonStyle:{
    marginBottom:10
  }
});

export default TemplateScreen;
