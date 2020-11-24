import { Chip } from 'react-native-paper';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DraxView } from 'react-native-drax';
import PlanContext from '../PlanContext'

const Translate = { COMP_SCI: "CS", AF_AM_ST: "AfAm", ARABIC: 'ARBC', MUSIC: 'MUS', SLAVIC: 'SLAV' }
const Course = ({ number, subject, index, categoryId, removeCourse }) => {
  const { currentPlan } = useContext(PlanContext);
  const [visible, setVisible] = useState(false);
  const menuToggle = () => setVisible(!visible);
  const rmCourse = useCallback(() => removeCourse(categoryId, index), [removeCourse, categoryId, index]);
  const courseTriggerNew = (
    <Chip
      style={styles.chip}
      onClose={rmCourse}
      mode={"flat"}
      style={styles.chip}
    >
      <DraxView
        draggingStyle={styles.dragging}
        draggable={true}
        dragPayload={{ categoryId, index }}
        onDragStart={() => {
          console.log("dragging")
        }}
        onDragEnd={() => {
          console.log("stopped dragging")
        }}
        onDragDrop={() => {
          console.log("dropped dragging")
        }}
      >
        <Text style={styles.chipText}>
          {`${Translate[subject] || subject} ${number}`}
        </Text>
      </DraxView>
    </Chip>
  )

  return (
    <Chip
      style={styles.chip}
      onClose={rmCourse}
      mode={"flat"}
      style={styles.chip}
    >
      <DraxView
        draggingStyle={styles.dragging}
        draggable={true}
        dragPayload={{ categoryId, index }}
        onDragStart={() => {
          console.log("dragging")
        }}
        onDragEnd={() => {
          console.log("stopped dragging")
        }}
        onDragDrop={() => {
          console.log("dropped dragging")
        }}
      >
        <View style={styles.chipStyle}>
          <Text style={styles.chipText}>
            {`${Translate[subject] || subject} ${number}`}
          </Text>
        </View>
      </DraxView>
    </Chip>
  )
}

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
    alignItems: "center",
    overflow: "hidden"
  },
  chipText: {
    fontSize: 12,
    paddingTop: 7
  },
  dragging: {
    opacity: 0.2,
  },
  chipStyle: {
    backgroundColor: "rgb(235, 235, 235)",
    borderRadius: 10,
    paddingHorizontal: 5,
  }
});

export default Course;
