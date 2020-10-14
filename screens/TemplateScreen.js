import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Button } from 'react-native-paper';
import React from 'react';
import templates from '../templates';

const TemplateScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {templates.map((template, i) => (
        <Button
          key={i}
          onPress={() => navigation.navigate('HomeScreen', { template })}
        >
          <Text>{template.name}</Text>
        </Button>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

export default TemplateScreen;
