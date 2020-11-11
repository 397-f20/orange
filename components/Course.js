import { Divider, List, Menu, Chip } from 'react-native-paper';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import CategoryContext from '../CategoryContext';
const Translate = {COMP_SCI:"CS", AF_AM_ST:"AF_AM"}
const Course = ({ number, subject, title, index, moveCourse, categoryId, removeCourse }) => {
  const { categories } = useContext(CategoryContext);
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const rmCourse = useCallback(() => removeCourse(categoryId, index), [removeCourse, categoryId, index]);
  const courseTriggerNew = (
    <Chip
    onPress={menuToggle}
    onClose={rmCourse}
    mode={"outlined"}
    style={styles.chip}
    >
      <Text>{`${Translate[subject] || subject} ${number}`}</Text>
    </Chip>
  )
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
        right={(props) => (
            <TouchableOpacity onPress={rmCourse}>
              <List.Icon color='red' icon='close' />
            </TouchableOpacity>
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
      anchor={courseTriggerNew}
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
  chip: {
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0
  },
});

export default Course;
