import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  FAB,
  TextInput,
  Text,
  List,
} from 'react-native-paper';

import SelectCategory from './SelectCategory';
import SelectTag from './SelectTag';
import SelectParent from './SelectParent';
import SelectTimeRequired from './SelectTimeRequired';
import SelectEnergyRequired from './SelectEnergyRequired';

import itemsContext from '../context/items/itemsContext';

const NewItemDialog = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
  };

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
    currentcategory,
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

  useEffect(() => {
    updateItem({...item, category: currentcategory});
  }, [currentcategory]);

  const setCategory = (category) => {
    handleFormChange(category, 'category');
  };

  const setParent = (parent) => {
    handleFormChange(parent, 'parent');
  };

  const setTags = (tags) => {
    handleFormChange(tags, 'tags');
  };

  const setTimeRequired = (time) => {
    handleFormChange(time, 'time');
  };

  const setEnergyRequired = (energy) => {
    handleFormChange(energy, 'energy')
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
            <SelectCategory
              category={item.category}
              setCategory={setCategory}
            />
            {item.category !== 'projects' &&
            item.category !== 'notebooks' &&
            item.category !== 'inbox' ? (
              <SelectParent parent={item.parent} setParent={setParent} />
            ) : null}
            <SelectTag setSelectedTags={setTags} />
            {item.category !== 'projects' &&
            item.category !== 'notebooks' &&
            item.category !== 'inbox' ? (
              <>
              <SelectTimeRequired
                time={item.time}
                setTimeRequired={setTimeRequired}
              />
              <SelectEnergyRequired
                energy={item.energy}
                setEnergyRequired={setEnergyRequired}
              />
              </>
            ) : null}
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
