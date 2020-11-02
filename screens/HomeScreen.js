import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from 'react-native-paper';
import Category from '../components/Category';
import CategoryContext from '../CategoryContext';

import { mockCourses } from '../mockCourses';

const unallocated = {
  name: 'Unallocated',
  total: null,
  addedCourses: mockCourses.slice(0, 15),
};

const HomeScreen = ({ navigation, route }) => {
  const { template, addCourse } = route.params;
  const { categories, setCurrentCategories } = useContext(CategoryContext);

  useEffect(() => {
    if (addCourse) {
      const copyOfCategories = categories.slice(0);
      console.info(addCourse);
      copyOfCategories[0].addedCourses.push(addCourse);
      setCategories(copyOfCategories);
    }
  }, [addCourse]);

  useEffect(() => {
    setCurrentCategories(template)
  }, [template]);

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newCategories[newCategoryIdx].addedCourses.push(course);

    AsyncStorage.setItem(template.name, newCategories);
    setCategories(newCategories);
  };
  const addCategory = (newCategory) => {
    const newCategories = categories.slice(0);
    newCategories.push(newCategory);
    setCategories(newCategories);
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <Button
        mode="contained"
        labelStyle={styles.buttonStyle}
        contentStyle={styles.buttonWrapStyle}
        onPress={() =>
          navigation.navigate('AddCategoryScreen', { addCategory })
        }
      >
        {`   Add Category    `}
      </Button>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {categories.map((category, i) => (
              <Category
                moveCourse={moveCourse}
                key={i}
                index={i}
                {...category}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  buttonStyle: {
    color: 'white',
  },
  buttonWrapStyle: {
    paddingBottom: 5,
    paddingTop: 5
  }
});

export default HomeScreen;
