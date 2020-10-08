import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, List } from 'react-native-paper'

import CategoryContext from '../CategoryContext';

const Course = ({ id, title, index, moveCourse, categoryId }) => {
  const categories = useContext(CategoryContext)
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const courseTrigger = (
    <View>
      <List.Item
        style={styles.list}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
        title={id} description={title}
        onPress={menuToggle}
        left={props => <List.Icon {...props} color="#3498db" icon="menu" />}
      />
      <Divider />
    </View>
  )

  return (
    <Menu
      contentStyle={styles.menuItems}
      visible={visible}
      onDismiss={menuToggle}
      anchor={courseTrigger}>
      {categories.map((category, i) =>
        <Menu.Item key={i} title={category.name}
          onPress={() => {
            moveCourse(categoryId, index, i)
            menuToggle()
          }} />)}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    flexDirection: 'column',
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  listTitle: {
    fontSize: 17,
  },
  listDescription: {
  }
});

export default Course;
