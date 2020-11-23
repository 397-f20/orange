import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

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
          <Button onPress={onDelete}>Delete</Button>
          <Button onPress={hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
