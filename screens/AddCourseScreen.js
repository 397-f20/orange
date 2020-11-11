import {Searchbar, Chip, Button, Menu, List } from 'react-native-paper';
import React, { useContext, useCallback, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0);

  const menuToggle = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const Fuse = getFuse(mockCourses)

  const updateQuery = (str) => {
    setSearchQuery(str);
    if (str.length < 3) {
      setMatches([]);
      return;
    }
    setMatches(
      Fuse.search(str)
    );
  };

  const addSelectedCourse = (index) => {
    setSelectedCourses([...selectedCourses, index]);
  }

  const commitChanges = useCallback(() => {
    navigation.navigate('HomeScreen', {
      addSelectedCourses: selectedCourses.map((idx) => mockCourses[idx]),
      addCourseCategory: selectedCategory,
    });
  }, [selectedCourses])


  const rmCourse = useCallback((index) => {
    setSelectedCourses(selectedCourses.filter((refIndex) => refIndex !== index));
  }, [selectedCourses])

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
    <ScrollView style={styles.addCourseContainer} keyboardDismissMode="on-drag">
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
            <AddCourseResult 
                idx={course.refIndex} 
                key={i} 
                course={course["item"]} 
                addSelectedCourse={addSelectedCourse}
            />
          ))}
        <Menu
            contentStyle={styles.menuItems}
            visible={menuOpen}
            onDismiss={menuToggle}
            anchor={
              <List.Item
                  title={categories[selectedCategory].name}
                  style={styles.categoryListStyle}
                right={props => <List.Icon {...props} icon="chevron-down"/>}
                  // mode={'contained'}
                  // style={styles.addToCat}
                  onPress={menuToggle}
              />
            }
        >
          {categories.map((category, i) => {
            return (
                <Menu.Item
                    key={i}
                    title={category.name}
                    onPress={() => {
                      setSelectedCategory(i);
                      menuToggle();
                    }}
                />)
          })}
        </Menu>
      <Button
        onPress={commitChanges}
        mode={'contained'}
        disabled={!selectedCourses.length}
      >
        Add Courses
      </Button>
    </ScrollView>
    </SafeAreaView>
   </> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBarStyle: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  addToCatWrap: {
    position:'absolute',
    bottom: 20,
    right: 20,
    width: 200,
    height: 50
  },
  addToCat: {
    width: 200,
  },
  selectedCourseContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  addCourseContainer: {
    flex:1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    height: '100%'
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
  categoryListStyle: {
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: 2,
    width: 300,
  }
})
export default AddCourseScreen;
