import React, { useContext, useEffect, useState } from 'react';
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
  const { template, addSelectedCourse, addCourseCategory } = route.params;
  const { categories, setCurrentCategories } = useContext(CategoryContext);
  console.info(addSelectedCourse, addCourseCategory)

  useEffect(() => {
    if (addSelectedCourse && addCourseCategory !== undefined) {
      console.info('adding course to category')
      addCourseToCategory(addCourseCategory, addSelectedCourse);
    }
  }, [addSelectedCourse, addCourseCategory]);

  useEffect(() => {
    const fetchLocalStorage = async () => {
      // fetching categories from react storage
      let storageCategories;
      try {
        storageCategories = JSON.parse(
          await AsyncStorage.getItem(template.name)
        );
      } catch (e) {
        storageCategories = null;
        console.error(e);
      }

      if (storageCategories) {
        setCurrentCategories(storageCategories);
      } else {
        const currentCategories = template.categories.slice(0);
        currentCategories.unshift(unallocated);
        setCurrentCategories(currentCategories);
      }
    };
    fetchLocalStorage();
  }, [template]);

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newCategories[newCategoryIdx].addedCourses.push(course);

    try {
      AsyncStorage.setItem(template.name, JSON.stringify(newCategories));
    } catch (e) {
      console.error(e);
    }

    setCurrentCategories(newCategories);
  };

  const addCourseToCategory = (selectedCategory, selectedCourse) => {
    const newCategories = categories.slice(0);
    newCategories[selectedCategory].addedCourses.push(selectedCourse);
    console.info(newCategories[selectedCategory]);

    try {
      AsyncStorage.setItem(template.name, JSON.stringify(newCategories));
    } catch (e) {
      console.error(e);
    }
    setCurrentCategories(newCategories);
  };

  const addCategory = (newCategory) => {
    const newCategories = categories.slice(0);
    newCategories.push(newCategory);
    setCurrentCategories(newCategories);
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <Button
        mode='contained'
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
    paddingTop: 5,
  },
});

export default HomeScreen;
