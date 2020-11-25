import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import React from 'react';

const DeleteDialog = (props) => {
  const { dialogText, hideDialog, onDelete, visible } = props;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Confirm Deletion</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{dialogText}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
        <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={onDelete} dark={true} mode='contained'>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
