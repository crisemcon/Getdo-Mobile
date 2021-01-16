import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
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
import SelectDueDate from './SelectDueDate';
import SelectScheduledDateTime from './SelectScheduledDateTime';
import SelectWaiting from './SelectWaiting';

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
    handleFormChange(energy, 'energy');
  };

  const setDueDate = (duedate) => {
    handleFormChange(duedate, 'dueDate');
  };

  const setScheduledDate = (scheduleddate) => {
    handleFormChange(scheduleddate, 'schedule')
  }

  const setWaiting = (waitingtag) => {
    handleFormChange(waitingtag, 'waiting')
  }

  //function to read form values
  const handleFormChange = (text, field) => {
    updateItem({
      ...item,
      [field]: text,
    });
  };

  const handleSubmit = () => {
		//e.preventDefault();
		//validate if itemname is empty
		if (item.name.trim() === "") {
			validateItem();
			return;
		}

		//checks if it is edition or new item
		if(currentitem === null){
			//new item
			addItem(item);
			//if it has a parent, attach to it
			if (item.parent !== "standalone") {
				itemBelongsProject(item);
			}
		} else {
			editItem(item);
		}

		//get and display the new item if it belongs to the current category
		if (currentcategory === item.category) {
			getItems(currentcategory);
		}
		//reset form and close dialog
		hideDialog();
		//resetState();
	};

  return (
    <View>
      <Portal>
        <FAB style={styles.fab} icon="plus" onPress={showDialog} />
      </Portal>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{maxHeight: '90%'}}>
          <Dialog.Title>New Action</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
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
                {item.category === "waiting" ? (
                  <SelectWaiting waiting={item.waiting} setWaiting={setWaiting} />
                ) : null}
                {item.category !== 'projects' &&
                item.category !== 'notebooks' &&
                item.category !== 'inbox' ? (
                  <SelectParent parent={item.parent} setParent={setParent} />
                ) : null}
                <SelectTag setSelectedTags={setTags} />
                
                {item.category === "scheduled" ? (
                  <SelectScheduledDateTime scheduledDate={item.schedule} setScheduledDate={setScheduledDate} />
                ) : null }
                {item.category !== 'inbox' && item.category !== 'notebooks' && item.category !== 'scheduled' ? (
                  <SelectDueDate duedate={item.dueDate} setDueDate={setDueDate} />
                ) : null}
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
            </ScrollView>
          </Dialog.ScrollArea>
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

export default NewItemDialog;
