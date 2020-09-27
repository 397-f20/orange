import { Text, View } from 'react-native';

import Course from './Course';
import React from 'react';

const UnallocatedCourses = ({ courses }) => {
  return (
    <View>
      <Text>Unallocated courses</Text>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </View>
  );
};

export default UnallocatedCourses;
