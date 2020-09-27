import React from 'react';
import { View, Text } from 'react-native'

const Course = ({course}) => {
    const { id, title, meets } = course;
    return (
        <View>
             <Text>{`id: ${id} title: ${title} meets: ${meets}`}</Text>
        </View>
    )
};

export default Course;
