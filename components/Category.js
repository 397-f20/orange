import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Course from './Course';


const Category = ({ name, total, addedCourses, moveCourse, index }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${name} ${addedCourses.length} out of ${total}`}</Text>
      {addedCourses.map((course, i) => (
        <Course key={i} index={i} moveCourse={moveCourse} categoryId={index} {...course} />
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
