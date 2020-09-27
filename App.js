import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import Category from './components/Category';
import UnallocatedCourses from './components/UnallocatedCourses';
import { mockCourses } from './mockCourses';

export default function App() {
  const [categories, setCategories] = useState([
    {
      name: 'Basic Engineering',
      total: 5,
      addedCourses: mockCourses.slice(0, 1),
    },
  ]);

  const [myCourses, setMyCourses] = useState(mockCourses.slice(0, 10));

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          {categories.map((category, i) => (
            <Category key={i} {...category} />
          ))}
          <UnallocatedCourses courses={myCourses} />
        </ScrollView>
      </View>
    </SafeAreaView>
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
