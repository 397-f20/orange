import {Searchbar, Chip, Button, Menu} from 'react-native-paper';
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

  const commitChanges = useCallback((catIdx) => {
    navigation.navigate('HomeScreen', {
      addSelectedCourses: selectedCourses.map((idx) => mockCourses[idx]),
      addCourseCategory: catIdx,
    });
  }, [selectedCourses])


  const rmCourse = useCallback((index) => {
    setSelectedCourses(selectedCourses.filter((refIndex) => refIndex !== index));
  }, [selectedCourses])

  return (
      <View>
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
      <View style={styles.addToCatWrap}>
        <Menu
            contentStyle={styles.menuItems}
            visible={menuOpen}
            onDismiss={menuToggle}
            anchor={
              <Button
                  disabled={selectedCourses.length === 0}
                  mode={'contained'}
                  style={styles.addToCat}
                  onPress={menuToggle}>Add to Category</Button>
            }
        >
          {categories.map((category, i) => {
            return (
                <Menu.Item
                    key={i}
                    title={category.name}
                    onPress={() => commitChanges(i)}
                />)
          })}

        </Menu>
      </View>

      </SafeAreaView>
    </ScrollView>

      </View>
  );
};

const styles = StyleSheet.create({
  addToCatWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  addToCat: {
    width: 250,
  },
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
