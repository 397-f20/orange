import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Course from './Course';


const Category = ({name, total, addedCourses, moveCourse, index}) => {

    const heading = total ? `${name} ${addedCourses.length} out of ${total}` : `${addedCourses.length} ${name}`
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{heading}</Text>
            {addedCourses.map((course, i) => (
                <Course key={i} index={i} moveCourse={moveCourse} categoryId={index} {...course} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
        padding: 15,
        backgroundColor: '#dbdbdb',
    },
    text: {
        color: '#000',
        fontSize: 25
    }
});

export default Category;
