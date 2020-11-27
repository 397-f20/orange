import { Chip, IconButton, Surface, Divider } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Course from './Course';
import DeleteDialog from './DeleteDialog';
import PlanContext from '../PlanContext';
import ProgressBar from './ProgressBar';
import { DraxView } from 'react-native-drax';

const Category = ({ navigation, name, total, addedCourses: courses, futureCourses, moveCourse, removeCourse, index }) => {
  const navigateAddCourse = () => {
    navigation.navigate('AddCourseScreen', { catIndex: index });
  };

  const [isVisible, setIsVisible] = useState(false);
  const { currentPlan, setCurrentPlan } = useContext(PlanContext);

  const onDeleteCategory = () => {
    const newPlan = currentPlan.slice(0);

    newPlan.splice(index, 1);
    setCurrentPlan(newPlan);
  };

  const addedCourses = courses || [];
  const styledHeading = (
    <View>
      {total ? (
        <>
        <View style={styles.categoryHeader}>
          <Text style={styles.allocated}>
            <Text style={styles.numCourses}>{`${addedCourses.length}/${total} `}</Text>
            <Text style={styles.categoryTitle}>{name}</Text>
            {/* <IconButton style={styles.deleteButton} icon='close-circle' color='grey' size={20} onPress={() => setIsVisible(true)} /> */}
          </Text>
          <IconButton style={styles.deleteButton} icon='close-circle' color='grey' size={20} onPress={() => setIsVisible(true)} />
          </View>
        </>
      ) : (
        <Text style={styles.unallocated}>
          <Text style={styles.numCourses}>{`${addedCourses.length} `}</Text>
          <Text style={styles.categoryTitle}>{name}</Text>
        </Text>
      )}
    </View>
  );

  return (
    <>
      <View>
        { Number.isInteger(parseInt(total)) ? <ProgressBar total={total} numCourses={addedCourses.length} /> : null}
        <Surface style={styles.category}>
          {styledHeading}
          <Divider style={styles.dividerStyle} />
          <DraxView
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(name)
              console.log(`hello ${payload.index}`)
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              if (payload.categoryId !== index || !payload.isCompleted)
                moveCourse(payload.categoryId, payload.index, index, true, payload.isCompleted);
              console.log(name)
              console.log(`received ${payload}`)
            }}
            receivingStyle={styles.receiving}
          >
            <View style={styles.completedCourseContainer}>
              {addedCourses.map((course, i) => (
                <View key={i} style={styles.course}>
                  <Course
                    removeCourse={removeCourse}
                    key={i}
                    index={i}
                    moveCourse={moveCourse}
                    categoryId={index}
                    isCompleted={true}
                    {...course}
                  />
                </View>
              ))}
            </View>
            <View style={styles.subCategoryContainer}>
              <Text style={styles.subCategoryText}>Completed</Text>
            </View>
          </DraxView>
          <Divider style={styles.dividerStyle} />
          <DraxView
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(name)
              console.log(`hello ${payload.index}`)
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              if (payload.categoryId !== index || payload.isCompleted) 
                moveCourse(payload.categoryId, payload.index, index, false, payload.isCompleted);
              console.log(name)
              console.log(`received ${payload}`)
            }}
            receivingStyle={styles.receiving}
          >
            <View style={styles.futureCourseContainer}>
              {futureCourses.map((course, i) => (
                <View key={i} style={styles.course}>
                  <Course
                    removeCourse={removeCourse}
                    key={i}
                    index={i}
                    moveCourse={moveCourse}
                    categoryId={index}
                    isCompleted={false}
                    {...course}
                  />
                </View>
              ))}
              <Chip onPress={navigateAddCourse} mode={'flat'} style={styles.chip} textStyle={styles.chipText}>
                +
              </Chip>
              </View>
              <View style={styles.subCategoryContainer}>
                <Text style={styles.subCategoryText}>Planned</Text>
              </View>
          </DraxView>
        </Surface>
      </View>
      {isVisible && (
        <DeleteDialog
          dialogText='Do you want to delete this category?'
          hideDialog={() => setIsVisible(false)}
          onDelete={onDeleteCategory}
          visible={isVisible}
        />
      )}
    </>
  );
};

// <ProgressBar style={{ backgroundColor: 'lightgrey', width: headerWidth }} progress={}
//              color={colorMap(addedCourses.length / total)} />

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numCourses: {
    color: 'darkgrey',
    paddingRight: 5,
    fontSize: 15,
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
  allocated: {
    flexDirection: 'row',
    width: '90%'
  },
  categoryTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    color: '#23022E'
  },
  progressLabel: {
    paddingLeft: 8,
    color: 'grey',
  },
  course: {
    paddingRight: 5,
    paddingBottom: 5,
  },
  completedCourseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 0,
  },
  chip: {
    height: 25,
    alignItems: "center",
    paddingBottom: 4,
    marginBottom: 5
  },
  chipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  deleteButton: {
    marginLeft: 2,
    paddingLeft: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    alignSelf: 'flex-end',
    marginTop: -5,
    marginRight: -5
  },
  receiving: {
    borderColor: '#3798DB',
    borderRadius: 4,
    borderWidth: 1,
  },
  futureCourseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 0,
  },
  subCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  subCategoryText: {
    fontSize: 12,
    opacity: 0.5
  },
  dividerStyle: {
    marginTop: 10,
    height: 2
  },
});

export default Category;
