import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Colors from './colors';

export default function FormTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={Colors.mediumGrey}
        {...otherProps}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10
  },
  icon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 18,
    color: '#23022E'
  },
  rightIconStyles: {
    alignSelf: 'center',
    marginLeft: 10
  }
});