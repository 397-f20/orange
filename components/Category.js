import React from 'react';
import {Text, View} from "react-native";
import Course from './Course'

const Category = ({name, courses, total, addedCourses}) => {

    return (
        <View>
            <Text>{`${name} ${addedCourses.length} out of ${total}`}</Text>
            {courses.map((course) => <Course course={course}/>)}
        </View>
    )
}
