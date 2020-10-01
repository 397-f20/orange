import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View,  } from 'react-native';
import CategoryContext from './CategoryContext';

import Category from './components/Category';
import { mockCourses } from './mockCourses';

export default function App() {
  const [categories, setCategories] = useState([
    {
      name: 'Unallocated Courses',
      addedCourses: mockCourses.slice(0, 10),
      total: null
    },
    {
      name: 'Basic Engineering',
      total: 5,
      addedCourses: mockCourses.slice(10, 11),
    },
    {
      name: 'Basic Sciences',
      total: 3,
      addedCourses: mockCourses.slice(12, 13),
    },
  ]);

  const [myCourses, setMyCourses] = useState(mockCourses.slice(0, 10));

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];
    
    // Doesn't affect the length property or the indexes. Becomes undefined instead of deleted
    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1)
    newCategories[newCategoryIdx].addedCourses.push(course);
    console.log(newCategories)

    setCategories(newCategories);
  }

  return (
    <CategoryContext.Provider value={categories}>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            {categories.map((category, i) => (
              <Category moveCourse={moveCourse} key={i} index={i} {...category} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </CategoryContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
