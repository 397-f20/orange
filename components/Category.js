import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Course from './Course';


const Category = ({ name, total, addedCourses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${name} ${addedCourses.length} out of ${total}`}</Text>
      {addedCourses.map((course) => (
        <Course {...course} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'blue',
      marginBottom: 15,
      marginTop: 15,
    },
    text: {
      color: 'white',
      fontSize: 25
    }
});

export default Category;
