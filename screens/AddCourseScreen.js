import { Searchbar, Chip } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AddCourseResult from '../components/AddCourseResult'
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';
import {getFuse} from '../Search'

const AddCourseScreen = ({ navigation }) => {
  const { categories } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

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

  const addSelectedCourse = (index) => {
    setSelectedCourses([...selectedCourses, index]);
  }

  const addCourse = (selectedCourse, selectedCategory) => {
    setSearchQuery('');
    navigation.navigate('HomeScreen', {
      addSelectedCourse: selectedCourse,
      addCourseCategory: selectedCategory,
    });
  };

  const rmCourse = (index) => {
    setSelectedCourses(selectedCourses.filter((refIndex) => refIndex !== index));
  }

  return (
    <ScrollView style={styles.addCourseContainer} keyboardDismissMode="on-drag">
      <SafeAreaView>
        <Searchbar
          placeholder='Search Courses'
          onChangeText={updateQuery}
          value={searchQuery}
          autoFocus={true}
        />
        {selectedCourses.length !== 0 && 
          <View style={styles.selectedCourseContainer}>
            {selectedCourses.map((courseIdx)  => (
              <Chip
                mode={'outlined'}
                style={styles.chipStyle}
                onClose={() => rmCourse(courseIdx)}
              >
                {mockCourses[courseIdx].name}
              </Chip>
            ))}
          </View>
        }
        {matches.filter((course) => (
          selectedCourses.indexOf(course.refIndex) === -1
        )).slice(0, 10).map((course, i) => (
            <AddCourseResult idx={course.refIndex} key={i} course={course["item"]} categories={categories}
              addSelectedCourse={addSelectedCourse}
            />
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
  selectedCourseContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 20,
    
  },
  chipStyle: {
    marginRight: 5,
    marginBottom: 5,
  },
  listIconStyle: {
    marginLeft: 0,
    marginRight: 0,
    width: 20,
  },
})
export default AddCourseScreen;
