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
      <List.Accordion title={heading} style={styles.list} titleStyle={styles.listTitle} expanded={expanded} onPress={handlePress}>
        {addedCourses.map((course, i) => (
          <Course key={i} index={i} moveCourse={moveCourse} categoryId={index} {...course} />
        ))}
      </List.Accordion>
    </Card>
  );
};

const styles = StyleSheet.create({
  category: {
    marginBottom: 13,
  },
  list: {
    backgroundColor: "#eee",
    padding: 18,
  },
  listTitle: {
    fontSize: 18
  }
});

export default Category;
