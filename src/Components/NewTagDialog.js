import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import tagsContext from '../context/tags/tagsContext';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  FAB,
  TextInput,
  HelperText,
  Text,
  List,
} from 'react-native-paper';

const NewTagDialog = ({visible, setVisible, type}) => {
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //get tags State
  const tagContext = useContext(tagsContext);
  const {errortag, addTag, validateTag} = tagContext;

  //form
  //form tag state
  const [tag, updateTag] = useState({
    name: '',
    type: type,
  });

  //function to read form values
  const handleFormChange = (text, field) => {
    updateTag({
      ...tag,
      [field]: text,
    });
  };

  const handleSubmit = () => {
    //validate if tagname is empty
    if (tag.name.trim() === '') {
      validateTag();
      return;
    }

    //new tag
    addTag(tag);

    //reset form and close dialog
    hideDialog();
  };

  return (
    <View>
      <Button icon="plus" mode="outlined" onPress={showDialog}>
        NEW {type} TAG
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            New {type.charAt(0).toUpperCase() + type.slice(1)} Tag
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tag Name"
              value={tag.name}
              mode="outlined"
              onChangeText={(text) => handleFormChange(text, 'name')}
            />
            <HelperText type="error" visible={errortag}>
              Tag name is required
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmit}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NewTagDialog;
