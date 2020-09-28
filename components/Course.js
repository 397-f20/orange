import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Course = ({ id, title, meets }) => {
  return (
    <View>
      <Text style={styles.text}>{`id: ${id} title: ${title} meets: ${meets}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    },
    text: {
      fontSize: 20,
      color: 'white'
    }
});

export default Course;
