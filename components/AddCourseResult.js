import { List, Menu } from "react-native-paper";
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

const AddCourseResult = ({ idx, categories, course, addCourse }) => {
    const [visible, setVisible] = useState(false)
    return (
        <Menu contentStyle={styles.menuItems} visible={visible} onDismiss={() => setVisible(!visible)}
            anchor={
                <List.Item
                    onPress={() => setVisible(true)}
                    key={idx}
                    title={`${course.subject} ${course.number} - ${course.title}`}
                    left={(props) => (
                        <List.Icon
                            {...props}
                            icon={'plus'}
                            style={styles.listIconStyle} />)} />}>
            {categories.map((category, catIdx) => (
              <Menu.Item
                key={catIdx}
                title={category.name}
                onPress={() => { addCourse(course, catIdx); }}
            />))}
        </Menu>)
}

const styles = StyleSheet.create({
    dialog: {
        height: 600,
    },
    addCourseContainer: {
        margin: 20,
        marginTop: 30,
        height: '100%',
    },
    listIconStyle: {
        marginLeft: 0,
        marginRight: 0,
        width: 20,
    },
});

export default AddCourseResult
