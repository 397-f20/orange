import { Searchbar } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AddCourseResult from '../components/AddCourseResult'
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';
import {getFuse} from '../Search'

const AddCourseScreen = ({ navigation }) => {
  const { categories } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const Fuse = getFuse(mockCourses)

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
      Fuse.search(str)
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
    <ScrollView style={styles.addCourseContainer} keyboardDismissMode="on-drag">
      <SafeAreaView>
        <Searchbar
          placeholder='Search Courses'
          onChangeText={updateQuery}
          value={searchQuery}
        />
          {matches.slice(0, 10).map((course, i) => (
            <AddCourseResult idx={i} key={i} course={course["item"]} categories={categories} addCourse={addCourse} />
          ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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