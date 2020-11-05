import { Button, Dialog, List, Menu, Searchbar } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AddCourseResult from '../components/AddCourseResult'
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';

const AddCourseScreen = ({ navigation }) => {
  const { categories } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const updateQuery = (str) => {
    const searchCurrentMatches =
      matches.length > 0 && str.length > searchQuery.length;
    setSearchQuery(str);
    if (str.length < 3) {
      setMatches([]);
      return;
    }
    const searchLower = str.toLowerCase();
    setMatches(
      (searchCurrentMatches ? matches : mockCourses).filter((course) => {
        return (
          course.number.indexOf(str) !== -1 ||
          course.subject.toLowerCase().indexOf(searchLower) !== -1 ||
          course.title.toLowerCase().indexOf(searchLower) !== -1
        );
      })
    );
  };

  const addCourse = (selectedCourse, selectedCategory) => {
    setSearchQuery('');
    navigation.navigate('HomeScreen', {
      addSelectedCourse: selectedCourse,
      addCourseCategory: selectedCategory,
    });
  };

  return (
    <ScrollView style={styles.addCourseContainer}>
      <SafeAreaView>
        <Searchbar
          placeholder='Search Courses'
          onChangeText={updateQuery}
          value={searchQuery}
        />
        <View accessibilityLabel={'addcoursedialog'}>
          {matches.slice(0, 10).map((course, i) => (
            <AddCourseResult idx={i} key={i} course={course} categories={categories} addCourse={addCourse} />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dialogActions: {
    marginBottom: 30
  },
  dialog: {
    height: 600,
  },
  addCourseContainer: {
    margin: 20,
    marginTop: 30,
    height: '100%',
  },
  listIconStyle: {
    marginLeft: 0,
    marginRight: 0,
    width: 20,
  },
})
export default AddCourseScreen;
