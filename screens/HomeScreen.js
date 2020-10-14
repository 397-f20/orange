import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';
import Category from '../components/Category';

const unallocated = {
  name: "Unallocated",
  total: null,
  addedCourses: mockCourses.slice(0, 15)
};

const HomeScreen = ({ navigation, route }) => {
  const { template, addCourse } = route.params;

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const currentCategories = template.categories.slice(0);
    currentCategories.unshift(unallocated);
    setCategories(currentCategories)
  }, [template])
  useEffect(() => {
    if (addCourse) {
      const copyOfCategories = categories.slice(0)
      console.info(addCourse)
      copyOfCategories[0].addedCourses.push(addCourse)
      setCategories(copyOfCategories)
    }
  }, [addCourse])
  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1)
    newCategories[newCategoryIdx].addedCourses.push(course);

    setCategories(newCategories);
  }
  const addCategory = (newCategory) => {
    const newCategories = categories.slice(0);
    newCategories.push(newCategory)
    setCategories(newCategories)
    navigation.navigate('HomeScreen')
  }

  return (
    <CategoryContext.Provider value={categories}>
      <ScrollView>
      <SafeAreaView style={styles.container}>
        <Button
          onPress={() => navigation.navigate('AddCategoryScreen', { addCategory })}> Add Category </Button>
          {categories.map((category, i) => (
            <Category moveCourse={moveCourse} key={i} index={i} {...category} />
          ))}
      </SafeAreaView>
      </ScrollView>
    </CategoryContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15
  },
});


export default HomeScreen
