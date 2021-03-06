import { Button, Chip, List, Menu, Searchbar } from 'react-native-paper';
import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import AddCourseResult from '../components/AddCourseResult';
import PlanContext from '../PlanContext';
import { getFuse } from '../Search';
import { mockCourses } from '../mockCourses';

const AddCourseScreen = ({ navigation, route }) => {
  const { catIndex } = route.params;
  const { currentPlan } = useContext(PlanContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(Number.isInteger(catIndex) ? catIndex : 0);
  const menuToggle = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const Fuse = getFuse(mockCourses);

  const updateQuery = (str) => {
    setSearchQuery(str);
    if (str.length < 3) {
      setMatches([]);
      return;
    }
    setMatches(Fuse.search(str));
  };

  const addSelectedCourse = (index) => {
    setSelectedCourses([...selectedCourses, index]);
  };

  const commitChanges = useCallback(() => {
    navigation.navigate('HomeScreen', {
      addSelectedCourses: selectedCourses.map((idx) => mockCourses[idx]),
      addCourseCategory: selectedCategory,
    });
  }, [selectedCourses, selectedCategory]);

  const rmCourse = useCallback(
    (index) => {
      setSelectedCourses(selectedCourses.filter((refIndex) => refIndex !== index));
    },
    [selectedCourses]
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder='Search Courses'
          onChangeText={updateQuery}
          value={searchQuery}
          autoFocus={true}
          style={styles.searchBarStyle}
        />
        <ScrollView style={styles.addCourseContainer} keyboardDismissMode='on-drag'>
          {selectedCourses.length !== 0 && (
            <View style={styles.selectedCourseContainer}>
              {selectedCourses.map((courseIdx) => (
                <Chip
                  key={courseIdx}
                  mode={'flat'}
                  style={styles.chipStyle}
                  textStyle={styles.chipText}
                  onClose={() => rmCourse(courseIdx)}
                >
                  {mockCourses[courseIdx].name}
                </Chip>
              ))}
            </View>
          )}
          <View style={styles.courseResults}>
            {matches
              .filter((course) => selectedCourses.indexOf(course.refIndex) === -1)
              .slice(0, 15)
              .map((course, i) => (
                <AddCourseResult
                  style={styles.oneCourse}
                  idx={course.refIndex}
                  key={i}
                  course={course['item']}
                  addSelectedCourse={addSelectedCourse}
                />
              ))}
          </View>
        </ScrollView>
        <Menu
          contentStyle={styles.menuItems}
          visible={menuOpen}
          onDismiss={menuToggle}
          anchor={
            <List.Item
              title={currentPlan[selectedCategory].name}
              style={styles.categoryListStyle}
              right={(props) => <List.Icon {...props} icon='chevron-down' />}
              onPress={menuToggle}
            />
          }
        >
          {currentPlan.map((category, i) => {
            return (
              <Menu.Item
                key={i}
                title={category.name}
                onPress={() => {
                  setSelectedCategory(i);
                  menuToggle();
                }}
              />
            );
          })}
        </Menu>
        <Button
          labelStyle={styles.confirmLabel}
          style={styles.confirmButton}
          onPress={commitChanges}
          mode={'contained'}
          disabled={!selectedCourses.length}
        >
          Add Courses
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  courseResults: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
    margin: 25,
    marginTop: 5,
  },
  searchBarStyle: {
    marginTop: 20,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  selectedCourseContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  addCourseContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 40,
    height: '100%',
  },
  chipStyle: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#ADA8B6',
  },
  chipText: {
    color: '#23022E',
  },
  listIconStyle: {
    marginLeft: 0,
    marginRight: 0,
    width: 20,
  },
  categoryListStyle: {
    lineHeight: 48,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 4,
    paddingVertical: 0,
    shadowOffset: { height: 3, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 40,
  },
  confirmButton: {
    marginHorizontal: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  confirmLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  oneCourse: {
    shadowOffset: { height: 3, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.24,
  },
});
export default AddCourseScreen;
