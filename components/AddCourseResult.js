import React from 'react';
import { List } from "react-native-paper";
import { StyleSheet } from 'react-native';

const AddCourseResult = ({ idx, course, addSelectedCourse }) => {
    return (
      <List.Item
          onPress={() => addSelectedCourse(idx)}
          key={idx}
          style={styles.listStyle}
          title={`${course.subject} ${course.number} - ${course.title}`}
          left={(props) => (
              <List.Icon
                  {...props}
                  icon={'plus-circle-outline'}
                  style={styles.listIconStyle} />)} />
    )
}

const styles = StyleSheet.create({
    listStyle: {
      height: 40,
      justifyContent:'center',
    },
    listIconStyle: {
        marginLeft: 0,
        marginRight: 0,
        width: 20,
        
    },
});

export default AddCourseResult
