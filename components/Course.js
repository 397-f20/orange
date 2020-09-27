import { Text, View } from 'react-native';

import React from 'react';

const Course = ({ id, title, meets }) => {
  return (
    <View>
      <Text>{}</Text>
      <Text>{`id: ${id} title: ${title} meets: ${meets}`}</Text>
    </View>
  );
};

export default Course;
