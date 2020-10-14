import { Divider, List, Menu } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoryContext from '../CategoryContext';

const Course = ({
  number,
  department,
  title,
  index,
  moveCourse,
  categoryId,
}) => {
  const categories = useContext(CategoryContext);
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const courseTrigger = (
    <View>
      <List.Item
        style={styles.list}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
        title={`CS ${number}`}
        description={title}
        onPress={menuToggle}
        left={(props) => <List.Icon {...props} color='#3498db' icon='menu' />}
      />
      <Divider inset={false} style={{ padding: 0.5 }} />
    </View>
  );

  return (
    <Menu
      contentStyle={styles.menuItems}
      visible={visible}
      onDismiss={menuToggle}
      anchor={courseTrigger}
    >
      {categories.map((category, i) => (
        <Menu.Item
          key={i}
          title={category.name}
          onPress={() => {
            moveCourse(categoryId, index, i);
            menuToggle();
          }}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    flexDirection: 'column',
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  listTitle: {
    fontSize: 17,
  },
  listDescription: {},
});

export default Course;
