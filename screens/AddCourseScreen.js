import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Searchbar, List } from "react-native-paper";
import { mockCourses } from "../mockCourses";

const AddCourseScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const updateQuery = str => {
    const searchCurrentMatches = matches.length > 0 && (str.length > searchQuery.length)
    setSearchQuery(str);
    if (str.length < 3) {
      setMatches([])
      return
    }
    const searchLower = str.toLowerCase();
    setMatches(
      (searchCurrentMatches ? matches : mockCourses).filter(course => {
        return (
          course.number.indexOf(str) !== -1 ||
          course.subject.toLowerCase().indexOf(searchLower) !== -1 ||
          course.title.toLowerCase().indexOf(searchLower) !== -1
        );
      })
    );
  };
  const addCourse = course => {
    setMatches([]);
    setSearchQuery('');
    navigation.navigate("HomeStackScreen", {
      screen: "HomeScreen",
      params: { addCourse: course }
    });
  };
  return (
    <ScrollView style={styles.addCourseContainer}>
      <SafeAreaView>
        <Searchbar
          placeholder="Search Course"
          onChangeText={updateQuery}
          value={searchQuery}
        />
        {matches.slice(0,10).map((course, i) => (
          <List.Item
            key={i}
            title={`${course.subject} ${course.number} - ${course.title}`}
            left={props => <List.Icon {...props} icon={"plus"} style={styles.listIconStyle}/>}
            onPress={() => {
              addCourse(course);
            }}
          ></List.Item>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addCourseContainer:{
      margin:20,
      marginTop:60
  },
  listIconStyle:{
    marginLeft:0,
    marginRight:0,
    width:20
  }
})

export default AddCourseScreen;
