import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { mockCourses } from './mockCourses'
import { Category } from './components/Category'
import Course from './components/Course'

export default function App() {

    const [categories, setCategories] = useState([
        {
            name: "Basic Engineering",
            total: 5,
            addedCourses: [],
        },
    ])

    const [myCourses, setMyCourses] = useState(
        mockCourses.slice(0, 10)
    )



    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                {myCourses.map( (course) =>
                    <Course course={course}/>
                )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
