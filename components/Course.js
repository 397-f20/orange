import { Divider, List, Menu, Chip } from 'react-native-paper';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PlanContext from '../PlanContext'

const Translate = {COMP_SCI:"CS", AF_AM_ST:"AfAm", ARABIC: 'ARBC', MUSIC: 'MUS', SLAVIC: 'SLAV'}
const Course = ({ number, subject, title, index, moveCourse, categoryId, removeCourse }) => {
  const { planKey, plans } = useContext(PlanContext);
  const categories = plans[planKey];
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const rmCourse = useCallback(() => removeCourse(categoryId, index), [removeCourse, categoryId, index]);
  const courseTriggerNew = (
    <Chip
      onPress={menuToggle}
      onClose={rmCourse}
      mode={"flat"}
      style={styles.chip}
      textStyle={styles.chipText}
    >
        {`${Translate[subject] || subject} ${number}`}
    </Chip>
  )

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
    height: 25,
    alignItems: "center"
  },
  chipText: {
    fontSize: 12,
  }
});

export default Course;
