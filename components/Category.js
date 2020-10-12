import { Card, List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import Course from './Course';
import React from 'react';

const Category = ({ name, total, addedCourses, moveCourse, index }) => {
  const styledHeading = (
    <View style={styles.header}>
      {total ? (
        <>
          <Text>{name}</Text>
          <Text style={styles.numCourses}>
            {`${addedCourses.length} out of ${total}`}{' '}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.numCourses}>{`${addedCourses.length} `}</Text>
          <Text>{name}</Text>
        </>
      )}
    </View>
  );
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <Card style={styles.category}>
      <List.Accordion
        title={styledHeading}
        style={styles.list}
        titleStyle={styles.listTitle}
        expanded={expanded}
        onPress={handlePress}
      >
        {addedCourses.map((course, i) => (
          <Course
            key={i}
            index={i}
            moveCourse={moveCourse}
            categoryId={index}
            {...course}
          />
        ))}
      </List.Accordion>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  numCourses: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'darkgrey',
  },
  category: {
    marginBottom: 13,
  },
  list: {
    backgroundColor: '#e3e1e1',
    padding: 10,
  },
  listTitle: {
    fontSize: 18,
  },
});

export default Category;
