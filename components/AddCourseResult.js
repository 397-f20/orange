import { List, Menu } from "react-native-paper";
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

const AddCourseResult = ({ idx, categories, course, addSelectedCourse }) => {
    return (
      <List.Item
          onPress={() => addSelectedCourse(idx)}
          key={idx}
          style={styles.listStyle}
          title={`${course.subject} ${course.number} - ${course.title}`}
          left={(props) => (
              <List.Icon
                  {...props}
                  icon={'plus'}
                  style={styles.listIconStyle} />)} />
    )
}

const styles = StyleSheet.create({
    listStyle: {
      height: 40
    },
    listIconStyle: {
        marginLeft: 0,
        marginRight: 0,
        width: 20,
    },
});

export default AddCourseResult
