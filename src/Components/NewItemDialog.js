import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  FAB,
  TextInput,
  Text,
  List
} from 'react-native-paper';

import SelectCategory from './SelectCategory';
import SelectTag from './SelectTag';

import itemsContext from "../context/items/itemsContext";



const NewItemDialog = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		erroritem,
		currentitem,
		getItems,
		addItem,
		validateItem,
		getProjects,
		itemBelongsProject,
		editItem,
    unselectCurrentItem,
    currentcategory
	} = itemlistContext;

 //TODO: ADD THESE VARIABLES FROM CONTEXT
  const projectId = undefined;

  const [item, updateItem] = useState(
    currentitem !== null
      ? currentitem
      : {
          name: '',
          note: '',
          category:
            currentcategory !== 'trash' && currentcategory !== 'focus'
              ? projectId !== undefined
                ? 'next'
                : currentcategory
              : 'inbox',
          tags: [],
          parent: projectId !== undefined ? projectId : 'standalone',
          focus: false,
          done: false,
          items: [],
          dueDate: null,
          time: undefined,
          energy: undefined,
          waiting: undefined,
          schedule: null,
          trash: false,
        },
  );

  const setCategory = (category) => {
	handleFormChange(category, 'category');
  }
  

  //function to read form values
  const handleFormChange = (text, field) => {
    updateItem({
      ...item,
      [field]: text,
    });
  };

  return (
    <View>
      <Portal>
        <FAB style={styles.fab} icon="plus" onPress={showDialog} />
      </Portal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Action</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Action Name"
              value={item.name}
              mode="outlined"
              onChangeText={(text) => handleFormChange(text, 'name')}
            />
            <TextInput
              label="Note or Description"
              value={item.note}
              mode="outlined"
              onChangeText={(text) => handleFormChange(text, 'note')}
            />
            <SelectCategory category={item.category} setCategory={setCategory}/>
            <SelectTag />
            {/*<RNPickerSelect
			placeholder={{label: item.category}}
              onValueChange={(text) => handleFormChange(text, 'category')}
              items={[
                {label: 'Inbox', value: 'inbox'},
                {label: 'Next', value: 'next'},
                {label: 'Waiting', value: 'waiting'},
                {label: 'Scheduled', value: 'scheduled'},
                {label: 'Someday', value: 'someday'},
                {label: 'Projects', value: 'projects'},
                {label: 'Notebooks', value: 'notebooks'},
              ]}
            />*/}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
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

export default NewItemDialog;
