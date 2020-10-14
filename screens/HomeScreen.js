import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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
  const { template } = route.params;

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const currentCategories = template.categories.slice(0);
    currentCategories.unshift(unallocated);
    setCategories(currentCategories);
  }, [template]);
  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newCategories[newCategoryIdx].addedCourses.push(course);

    setCategories(newCategories);
  };
  const addCategory = (newCategory) => {
    const newCategories = categories.slice(0);
    newCategories.push(newCategory);
    setCategories(newCategories);
    navigation.navigate('HomeScreen');
  };

  return (
    <CategoryContext.Provider value={categories}>
      <SafeAreaView style={styles.container}>
        <Button
          onPress={() =>
            navigation.navigate('AddCategoryScreen', { addCategory })
          }
        >
          {' '}
          Add Category{' '}
        </Button>

        <ScrollView>
          {categories.map((category, i) => (
            <Category moveCourse={moveCourse} key={i} index={i} {...category} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </CategoryContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});

export default HomeScreen;
