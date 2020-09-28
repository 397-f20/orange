import { Text, View, StyleSheet  } from 'react-native';

import Course from './Course';
import React from 'react';

const UnallocatedCourses = ({ courses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unallocated courses</Text>
      {courses.map((course) => (
        <Course {...course} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    padding: 15
  },
  text: {
    fontSize: 25,
    color: 'white'
  }
});

export default UnallocatedCourses;
