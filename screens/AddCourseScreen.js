import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Searchbar, List } from "react-native-paper";
import { mockCourses } from "../mockCourses";

const AddCourseScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const updateQuery = str => {
    const searchLower = str.toLowerCase();
    setSearchQuery(str);
    setMatches(
      mockCourses.filter(course => {
        return (
          course.number.indexOf(str) !== -1 ||
          course.department.toLowerCase().indexOf(searchLower) !== -1 ||
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
    <ScrollView>
      <SafeAreaView>
        <Searchbar 
          placeholder="Search Course" 
          onChangeText={updateQuery} 
          value={searchQuery}
        />
        {matches.map((course, i) => (
          <List.Item
            key={i}
            title={`${course.department} ${course.number} - ${course.title}`}
            left={props => <List.Icon {...props} icon={"plus"} />}
            onPress={() => {
              addCourse(course);
            }}
          ></List.Item>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddCourseScreen;
