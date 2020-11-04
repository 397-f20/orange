import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { Button } from 'react-native-paper'

import Colors from './colors';

export default function FormButton({ title, color = 'primary' }) {
  const { handleSubmit, values } = useFormikContext();
  const text = (typeof title === 'string') ? title : title(values)

  return (
    <Button
      mode='contained'
      onPress={handleSubmit}
      style={styles.button}
      >
      <Text style={styles.buttonText}>{text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});