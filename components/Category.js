import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

import Course from './Course';

const Category = ({ name, total, addedCourses, moveCourse, index }) => {
  const heading = total ? `${name} ${addedCourses.length} out of ${total}` : `${addedCourses.length} ${name}`;
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <Card style={styles.category}>
      <List.Accordion title={heading} style={styles.list} expanded={expanded} onPress={handlePress}>
        {addedCourses.map((course, i) => (
          <Course key={i} index={i} moveCourse={moveCourse} categoryId={index} {...course} />
        ))}
      </List.Accordion>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#dbdbdb',
  },
  text: {
    color: '#000',
    fontSize: 25
  },
  category: {
    marginBottom: 18,
  },
  list: {
    backgroundColor: "#eee",
    color: "#444",
    padding: 18,
  }
});

export default Category;
