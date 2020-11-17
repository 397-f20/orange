import { Surface, Chip } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Course from './Course';
import React from 'react';
import ProgressBar from './ProgressBar'

const Category = ({ navigation, name, total, addedCourses: courses, moveCourse, removeCourse, index }) => {
  const navigateAddCourse = () => {
    navigation.navigate('AddCourseScreen', { catIndex: index } );
  }

  const addedCourses = courses || []
  const styledHeading = (
    <View>
      {total ? (
              <Text style={styles.unallocated}>
                <Text style={styles.numCourses}>{`${addedCourses.length}/${total} `}</Text>
                <Text style={styles.categoryTitle}>{name}</Text>
              </Text>
      ) : (
          <Text style={styles.unallocated}>
            <Text style={styles.numCourses}>{`${addedCourses.length} `}</Text>
            <Text style={styles.categoryTitle}>{name}</Text>
          </Text>
        )}
    </View>
  );

  return (
      <View>
          { Number.isInteger(parseInt(total)) ? <ProgressBar total={total} numCourses={addedCourses.length}/> : null }
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
            <Chip
              onPress={navigateAddCourse}
              mode={"flat"}
              style={styles.chip}
              textStyle={styles.chipText}
            >
              +
            </Chip>
            </View>
        </Surface>
      </View>
  );
};


// <ProgressBar style={{ backgroundColor: 'lightgrey', width: headerWidth }} progress={}
//              color={colorMap(addedCourses.length / total)} />

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numCourses: {
    color: 'darkgrey',
    paddingRight: 5,
    fontSize: 15
},
  category: {
    borderRadius: 5,
    marginBottom: 3,
    marginHorizontal: 3,
    paddingHorizontal: 7,
    paddingTop: 14,
    paddingBottom: 7,
    marginTop: 0,
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
    paddingRight: 5,
    paddingBottom: 5
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 0,
  },
  chip: {
    height: 25,
    alignItems: "center",
  },
  chipText: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default Category;
