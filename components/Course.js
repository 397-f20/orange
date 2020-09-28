import React, { useContext } from 'react';
import { Text, View, StyleSheet, Picker } from 'react-native';
import CategoryContext from '../CategoryContext';

const Course = ({ id, title, meets }) => {
  const categories = useContext(CategoryContext)
  return (
    <View style={styles.container}>
      <Picker>
        {categories.map((category, index) => <Picker.Item label={category.name} value={index}/>)}
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
