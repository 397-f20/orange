import { Surface, List, ProgressBar, Colors } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Course from './Course';
import React from 'react';

const Category = ({ name, total, addedCourses: courses, moveCourse, removeCourse, index }) => {
  const progressColors = [Colors.red600, Colors.orange600, Colors.yellow600, Colors.green600];
  const colorMap = value => progressColors[Math.floor(((progressColors.length - 1) * (value)))];

  const [headerWidth, setHeaderWidth] = React.useState(0)

  const headerSize = event => setHeaderWidth(.75 * event.nativeEvent.layout.width);

  const addedCourses = courses || []
  const styledHeading = (
    <View>
      {total ? (
        <>
          <Text style={styles.categoryTitle}>{name}</Text>
          <View style={styles.header} onLayout={headerSize}>
            <ProgressBar style={{ backgroundColor: 'lightgrey', width: headerWidth }} progress={Math.max(0.035, addedCourses.length / total)}
              color={colorMap(addedCourses.length / total)} />
            <Text style={styles.progressLabel}>
              {`${addedCourses.length}/${total}`}
            </Text>
          </View>
        </>
      ) : (
          <View style={styles.unallocated}>
            <Text style={styles.numCourses}>{`${addedCourses.length} `}</Text>
            <Text style={styles.categoryTitle}>{name}</Text>
          </View>
        )}
    </View>
  );

  return (
    <Surface style={styles.category}>
      {styledHeading}
        <View style={styles.courseContainer}>
        {addedCourses.map((course, i) => (
          <View style={styles.course}>
          <Course
            removeCourse={removeCourse}
            key={i}
            index={i}
            moveCourse={moveCourse}
            categoryId={index}
            {...course}
          />
          </View>
        ))}
        </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numCourses: {
    color: 'darkgrey',
    paddingRight: 10,
    fontSize: 15
  },
  category: {
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 10
  },
  unallocated: {
    flexDirection: 'row',
  },
  categoryTitle: {
    fontSize: 15
  },
  progressLabel: {
    paddingLeft: 8,
    color: 'grey'
  },
  course: {
    paddingHorizontal: 5,
    paddingBottom: 5
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 0,
  }
});

export default Category;
