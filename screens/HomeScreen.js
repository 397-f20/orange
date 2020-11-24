import { Avatar, Surface, Portal } from 'react-native-paper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Category from '../components/Category';
import CategoryContext from '../CategoryContext';
import PlanContext from '../PlanContext'
import { firebase } from '../firebase';

const unallocated = {
  name: 'Unallocated',
  total: null,
  addedCourses: [],
};



const HomeScreen = ({ navigation, route }) => {
  const { addSelectedCourses, addCourseCategory } = route.params;
  const { setCurrentPlan, currentPlan, planKey } = useContext(PlanContext);


  useEffect(() => {
    if (addSelectedCourses && addCourseCategory !== undefined) {
      addCourseToCategory(addCourseCategory, addSelectedCourses);
    }
  }, [addSelectedCourses, addCourseCategory]);

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newPlan = currentPlan.slice(0);
    const course = newPlan[oldCategoryIdx].addedCourses[oldCourseIdx];

    newPlan[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newPlan[newCategoryIdx].addedCourses.push(course);

    setCurrentPlan(newPlan);
  };

  const addCourseToCategory = (selectedCategory, selectedCourses) => {
    const newPlan = currentPlan.slice(0);
    newPlan[selectedCategory].addedCourses.push(...selectedCourses);
    setCurrentPlan(newPlan);
  };

  const removeCourse = (categoryIdx, courseIdx) => {
    let newPlan = currentPlan.slice(0);
    newPlan[categoryIdx].addedCourses = newPlan[categoryIdx].addedCourses.filter(
      (course, i) => i != courseIdx
    );
    setCurrentPlan(newPlan);
  };

  const addCategory = useCallback(
    (newCategory) => {
      const newPlan = currentPlan.slice(0);
      newPlan.push(newCategory);
      setCurrentPlan(newPlan);
      navigation.navigate('HomeScreen');
    },
    [currentPlan, setCurrentPlan]
  );

  const AddCategoryButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AddCategoryScreen', { addCategory })}>
      <Surface style={styles.addCategory}>
        <Avatar.Icon style={styles.addCategoryIcon} size={50} icon='plus' />
      </Surface>
    </TouchableOpacity>
  );

  const DegreeHeader = () => (
      <Surface style={styles.degreeHeader}>
        <Text style={styles.headerText}>{planKey}</Text>
      </Surface>
  );

  if (!currentPlan) {
    return null
  }

  return (
    <View style={styles.container}>
          <ScrollView>
            <DegreeHeader/>
            <View style={styles.categoryContainer}>
              {currentPlan.map((category, i) => (
                <View key={i} style={styles.category}>
                  <Category navigation={navigation} removeCourse={removeCourse} moveCourse={moveCourse} key={i} index={i} {...category} />
                </View>
              ))}
              <AddCategoryButton />
            </View>
          </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    color: 'white',
  },
  buttonWrapStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  category: {
    width: 175,
    paddingTop: 10,
    margin: 0,
    padding: 0,
  },
  addCategory: {
    paddingHorizontal: 7,
    width: 169,
    borderRadius: 5,
    marginBottom: 3,
    marginHorizontal: 3,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 10,
    backgroundColor: 'rgb(235, 235, 235)',
  },
  addCategoryIcon: {
    marginHorizontal: 'auto',
    marginVertical: 20,
    backgroundColor: '#fff',
    color: 'grey'
  },
  degreeHeader: {
    width: 350,
    marginHorizontal: 'auto',
    marginVertical: 10,
    borderRadius: 5,
    padding: 7,
    maxWidth: '90%',
  },
  headerText: {
    fontSize:16
  },
  container: {
    marginBottom: 20
  }
});

export default HomeScreen;
