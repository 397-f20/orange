import { Button, Dialog, List, Searchbar } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';

const AddCourseScreen = ({ navigation }) => {
  const { categories } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const updateQuery = (str) => {
    const searchLower = str.toLowerCase();
    setSearchQuery(str);
    setMatches(
      mockCourses.filter((course) => {
        return (
          course.number.indexOf(str) !== -1 ||
          course.department.toLowerCase().indexOf(searchLower) !== -1 ||
          course.title.toLowerCase().indexOf(searchLower) !== -1
        );
      })
    );
  };

  const addCourse = () => {
    setMatches([]);
    setSearchQuery('');
    navigation.navigate('HomeScreen', {
      addSelectedCourse: selectedCourse,
      addCourseCategory: selectedCategory,
    });
  };

  const cancelDialog = () => {
    setSelectedCourse({});
    setVisible(false);
  };

  return (
    <>
      <ScrollView style={styles.addCourseContainer}>
        <SafeAreaView>
          <Searchbar
            placeholder='Search Course'
            onChangeText={updateQuery}
            value={searchQuery}
          />
          {matches.map((course, i) => (
            <List.Item
              key={i}
              title={`${course.department} ${course.number} - ${course.title}`}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={'plus'}
                  style={styles.listIconStyle}
                />
              )}
              onPress={() => {
                setVisible(true);
                setSelectedCourse(course);
              }}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Add Course to Category</Dialog.Title>
        <Dialog.Content>
          {categories.map((category, i) => (
            <List.Item
              key={i}
              title={category.name}
              onPress={() => setSelectedCategory(i)}
            />
          ))}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancelDialog}>Cancel</Button>
          <Button onPress={addCourse}>Add Course</Button>
        </Dialog.Actions>
      </Dialog>
    </>
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
});

export default AddCourseScreen;
