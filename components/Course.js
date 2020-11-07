import { Divider, List, Menu } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoryContext from '../CategoryContext';

const Course = ({ number, subject, title, index, moveCourse, categoryId }) => {
  const { categories } = useContext(CategoryContext);
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const courseTrigger = (
    <View>
      <List.Item
        style={styles.list}
        titleStyle={styles.listTitle}
        title={`${subject} ${number}`}
        description={title}
        onPress={menuToggle}
        left={(props) => (
          <List.Icon {...props} color='#3498db' icon='folder-open' />
        )}
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
      <Menu.Item title={'MOVE TO'} titleStyle={styles.moveTo} disabled={true} />
      {categories.map((category, i) => {
        return (
          i !== categoryId && (
            <Menu.Item
              key={i}
              title={category.name}
              onPress={() => {
                moveCourse(categoryId, index, i);
                menuToggle();
              }}
            />
          )
        );
      })}
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
  moveTo: {
    color: '#949494',
  },
});

export default Course;
