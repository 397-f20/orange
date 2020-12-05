import { Chip } from 'react-native-paper';
import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DraxView } from 'react-native-drax';

const Translate = { BIOL_SCI: 'BIO', COMP_SCI: "CS", AF_AM_ST: "AfAm", ARABIC: 'ARBC', MUSIC: 'MUS', SLAVIC: 'SLAV' }
const Course = ({ number, subject, index, categoryId, removeCourse, isCompleted }) => {
  const rmCourse = useCallback(() => 
    removeCourse(categoryId, index, isCompleted), [removeCourse, categoryId, index]
);

  return (
    <Chip
      style={styles.chip}
      onClose={rmCourse}
      mode={"flat"}
      style={styles.chip}
    >
      <DraxView
        style={styles.chipContentDrax}
        hoverDraggingStyle={styles.hoverDragging}
        draggingStyle={styles.dragging}
        draggable={true}
        dragPayload={{ categoryId, index, isCompleted }}
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
        <View style={styles.chipContent}>
          <Text style={styles.chipText}>
            {`${Translate[subject] || subject} ${number}`}
          </Text>
        </View>
      </DraxView>
    </Chip>
  )
}

const styles = StyleSheet.create({
  chip: {
    height: 25,
    overflow: "hidden",
  },
  chipText: {
    fontSize: 12,
    color: '#23022E'
  },
  chipContentDrax: {
    backgroundColor: "rgb(235, 235, 235)",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },
  chipContent: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "#3798DB",
    borderWidth: 1
  }
});

export default Course;
