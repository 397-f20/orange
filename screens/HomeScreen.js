import { Avatar, Surface } from 'react-native-paper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Category from '../components/Category';
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';

const storeCategories = (name, categories) => {
  try {
    AsyncStorage.setItem(name, JSON.stringify(categories));
  } catch (e) {
    console.error(e);
  }
};

const unallocated = {
  name: 'Unallocated',
  total: null,
  addedCourses: [],
};

const HomeScreen = ({ navigation, route }) => {
  const { template, addSelectedCourses, addCourseCategory } = route.params;
  const { categories, setCurrentCategories } = useContext(CategoryContext);
  const [storageKey, setStorageKey] = useState(null);

  useEffect(() => {
    if (addSelectedCourses && addCourseCategory !== undefined) {
      addCourseToCategory(addCourseCategory, addSelectedCourses);
    }
  }, [addSelectedCourses, addCourseCategory]);

  useEffect(() => {
    setStorageKey(template.name);
    const fetchLocalStorage = async () => {
      // console.info("fetching from local storage")
      // fetching categories from react storage
      let storageCategories;
      try {
        storageCategories = JSON.parse(await AsyncStorage.getItem(template.name));
      } catch (e) {
        storageCategories = null;
        console.error(e);
      }

      if (storageCategories) {
        setCurrentCategories(storageCategories);
      } else {
        const currentCategories = template.categories.slice(0);
        currentCategories.unshift(unallocated);
        setCurrentCategories(currentCategories);
      }
    };
    fetchLocalStorage();
  }, [template, setStorageKey]);

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newCategories[newCategoryIdx].addedCourses.push(course);

    storeCategories(storageKey, newCategories);
    setCurrentCategories(newCategories);
  };

  const addCourseToCategory = (selectedCategory, selectedCourses) => {
    const newCategories = categories.slice(0);
    newCategories[selectedCategory].addedCourses.push(...selectedCourses);
    storeCategories(storageKey, newCategories);
    setCurrentCategories(newCategories);
  };

  const removeCourse = (categoryIdx, courseIdx) => {
    let newCategories = categories.slice(0);
    newCategories[categoryIdx].addedCourses = newCategories[categoryIdx].addedCourses.filter(
      (course, i) => i != courseIdx
    );
    storeCategories(storageKey, newCategories);
    setCurrentCategories(newCategories);
  };

  const addCategory = useCallback(
    (newCategory) => {
      const newCategories = categories.slice(0);
      newCategories.push(newCategory);
      storeCategories(storageKey, newCategories);
      setCurrentCategories(newCategories);
      navigation.navigate('HomeScreen');
    },
    [categories, storageKey, storeCategories, setCurrentCategories]
  );

  const AddCategoryButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AddCategoryScreen', { addCategory })}>
      <Surface style={styles.addCategory}>
        <Avatar.Icon style={styles.addCategoryIcon} size={50} icon='plus' />
      </Surface>
    </TouchableOpacity>
  );

  const DegreeHeader = () => (
      <Surface style={styles.degreeHeader}>
        <Text style={styles.headerText}>{template.name}</Text>
      </Surface>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <DegreeHeader/>
            <View style={styles.categoryContainer}>
              {categories.map((category, i) => (
                <View style={styles.category}>
                  <Category navigation={navigation} removeCourse={removeCourse} moveCourse={moveCourse} key={i} index={i} {...category} />
                </View>
              ))}
              <AddCategoryButton />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    color: 'white',
  },
  buttonWrapStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  category: {
    width: 175,
    paddingTop: 10,
    margin: 0,
    padding: 0,
  },
  addCategory: {
    paddingHorizontal: 7,
    width: 169,
    borderRadius: 5,
    marginBottom: 3,
    marginHorizontal: 3,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 10,
    backgroundColor: 'rgb(235, 235, 235)',
  },
  addCategoryIcon: {
    marginHorizontal: 'auto',
    marginVertical: 20,
    backgroundColor: '#fff',
    color: 'grey'
  },
  degreeHeader: {
    width: 350,
    marginHorizontal: 'auto',
    marginVertical: 10,
    borderRadius: 5,
    padding: 7,
    maxWidth: '90%',
  },
  headerText: {
    fontSize:16
  },
  container: {
    marginBottom: 20
  }
});

export default HomeScreen;
