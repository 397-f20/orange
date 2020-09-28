import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryContext from './CategoryContext';

import Category from './components/Category';
import UnallocatedCourses from './components/UnallocatedCourses';
import { mockCourses } from './mockCourses';

export default function App() {
  const [categories, setCategories] = useState([
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

  return (
    <CategoryContext.Provider value={categories}>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
          <UnallocatedCourses courses={myCourses} />
            {categories.map((category, i) => (
              <Category key={i} {...category} />
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
