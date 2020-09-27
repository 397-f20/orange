import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {mockCourses} from './mockCourses'
import {Category} from './components/Category'
import Course from './components/Course'



const course1 = {
    "id": "F101",
    "title": "Computer Science: Concepts, Philosophy, and Connections",
    "meets": "MWF 11:00-11:50"
}

const course2 = {
    "id": "F110",
    "title": "Intro Programming for non-majors",
    "meets": "MWF 10:00-10:50"
  }


export default function App() {
    
    const [categories, setCategories] = useState([
        {
            name: "Basic Engineering",
            courses: [
                course1,
                course2
            ],
        }
    ])

    const [myCourses, setMyCourses] = useState([
        course1
    ])



    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                {myCourses.map( (course) => {
                    <Course {...course}/>
                })}
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
