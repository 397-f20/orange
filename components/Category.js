import { Text, View } from 'react-native';

import Course from './Course';
import React from 'react';

const Category = ({ name, total, addedCourses }) => {
  return (
    <View>
      <Text>{`${name} ${addedCourses.length} out of ${total}`}</Text>
      {addedCourses.map((course) => (
        <Course {...course} />
      ))}
    </View>
  );
};

export default Category;
