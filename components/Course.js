import React, { useContext } from 'react';
import { Text, View, StyleSheet, Picker } from 'react-native';
import CategoryContext from '../CategoryContext';

const Course = ({ id, title, meets, index, moveCourse, categoryId }) => {
  const categories = useContext(CategoryContext)
  const handleChange = (itemValue, itemPosition) => {
    moveCourse(categoryId, index, itemPosition);
  }
  return (
    <View style={styles.container}>
      <Picker 
        onValueChange={handleChange}
        selectedValue={categoryId}
      >
        {categories.map((category, i) => <Picker.Item key={i} label={category.name} value={i}/>)}
      </Picker>
      <Text style={styles.text}>{`id: ${id} title: ${title} meets: ${meets}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
    },
    text: {
      fontSize: 20,
      color: 'white',
    }
});

export default Course;
