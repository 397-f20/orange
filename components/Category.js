import { Card, List, ProgressBar } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Course from './Course';
import React from 'react';

const Category = ({ name, total, addedCourses: courses, moveCourse, removeCourse, index }) => {
  const progressColors = [];

  const addedCourses = courses || []
  const styledHeading = (
    <View>
      {total ? (
        <>
          <Text>{name}</Text>
          <View style={styles.header}>
            <ProgressBar style={{width: Dimensions.get('window').width-125}} progress={addedCourses.length / total}
            color={'black'}/>
            <Text style={styles.progressLabel}>
              {`${addedCourses.length}/${total}`}
            </Text>
          </View>
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
            removeCourse={removeCourse}
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
    alignItems: 'center'
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
  progressLabel: {
    width: 10,
    paddingLeft: 8,
    color: 'darkgrey'
  }
});

export default Category;
