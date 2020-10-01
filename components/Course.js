import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CategoryContext from '../CategoryContext';
import {Picker} from '@react-native-community/picker';

const Course = ({id, title, meets, index, moveCourse, categoryId}) => {
    const categories = useContext(CategoryContext)
    const handleChange = (itemValue, itemPosition) => {
        moveCourse(categoryId, index, itemPosition);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${title}`}</Text>
            <Picker style={styles.picker}
                    onValueChange={handleChange}
                    selectedValue={categoryId}
            >
                {categories.map((category, i) => <Picker.Item key={i} label={category.name} value={i}/>)}
            </Picker>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    picker: {
        width: 250,
    },
    text: {
        fontSize: 20,
        color: '#000',
    }
});

export default Course;
