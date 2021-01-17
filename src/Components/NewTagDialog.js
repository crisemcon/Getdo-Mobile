import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import tagsContext from '../context/tags/tagsContext';
import itemsContext from '../context/items/itemsContext';
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
  const hideDialog = () => {
    unselectCurrentTag();
    setVisible(false);
  };

  //show activity indicator when submitting
  const [loading, setLoading] = useState(false);

  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {updateItemsTag} = itemlistContext;

  //get tags State
  const tagContext = useContext(tagsContext);
  const {
    errortag,
    addTag,
    validateTag,
    updateTag,
    currenttag,
    unselectCurrentTag,
  } = tagContext;

  //form
  //form tag state
  const [tag, setTag] = useState(
    currenttag !== null
      ? currenttag
      : {
          name: '',
          type: type,
        },
  );

  //function to read form values
  const handleFormChange = (text, field) => {
    setTag({
      ...tag,
      [field]: text,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    //validate if tagname is empty
    if (tag.name.trim() === '') {
      validateTag();
      setLoading(false);
      return;
    }

    if (currenttag === null) {
      //new tag
      addTag(tag);
    } else {
      //new tag
      updateTag(tag);
      updateItemsTag(tag);
    }
    setLoading(false);
    //reset form and close dialog
    hideDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            New {tag.type.charAt(0).toUpperCase() + tag.type.slice(1)} Tag
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tag Name"
              value={tag.name}
              mode="outlined"
              onChangeText={(text) => handleFormChange(text, 'name')}
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType={'visible-password'}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <HelperText type="error" visible={errortag}>
              Tag name is required
            </HelperText>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button loading={loading} onPress={handleSubmit}>
              Done
            </Button>
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
