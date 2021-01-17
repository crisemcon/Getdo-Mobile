import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  FAB,
  HelperText,
  Text,
  List,
  useTheme 
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

const NewItemDialog = ({visible, setVisible, projectId}) => {
  const { colors } = useTheme();
  const hideDialog = () => {
    setVisible(false);
    unselectCurrentItem();
  };

  //show activity indicator when submitting
  const [loading, setLoading] = useState(false);

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
    itemNotBelongsProject,
  } = itemlistContext;

  const [item, updateItem] = useState(
    currentitem !== null
      ? {
        id: currentitem.id,
        name: currentitem.name,
        note: currentitem.note,
        category: currentitem.category,
        tags: currentitem.tags,
        parent: currentitem.parent,
        focus: currentitem.focus,
        done: currentitem.done,
        items: currentitem.items,
        dueDate: currentitem.dueDate ? new Date(currentitem.dueDate) : null,
        time: currentitem.time,
        energy: currentitem.energy,
        waiting: currentitem.waiting,
        schedule: currentitem.schedule ? new Date(currentitem.schedule) : null,
        trash: currentitem.trash,
      }
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

  const [selectedTagsId, setSelectedTagsId] = useState(
    currentitem !== null ? currentitem.tags.map((tag) => tag.id) : [],
  );

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
    handleFormChange(scheduleddate, 'schedule');
  };

  const setWaiting = (waitingtag) => {
    handleFormChange(waitingtag, 'waiting');
  };

  //function to read form values
  const handleFormChange = (text, field) => {
    updateItem({
      ...item,
      [field]: text,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    //e.preventDefault();
    //validate if itemname is empty
    if (item.name.trim() === '') {
      validateItem();
      setLoading(false);
      return;
    }
    //checks if it is edition or new item
    if (currentitem === null) {
      //new item
      await addItem(item);
      //if it has a parent, attach to it
      if (item.parent !== 'standalone') {
        await itemBelongsProject(item);
      }
    } else {
      if (item.category === 'notebooks') {
        item.done = false;
      }
      if (
        item.category === 'scheduled' ||
        item.category === 'inbox' ||
        item.category === 'notebooks'
      ) {
        item.dueDate = null;
      }
      if (item.category !== 'scheduled') {
        item.schedule = null;
      }
      if (item.category !== 'waiting') {
        item.waiting = undefined;
      }
      if (
        item.category === 'inbox' ||
        item.category === 'notebooks' ||
        item.category === 'projects'
      ) {
        item.schedule = null;
        item.time = undefined;
        item.energy = undefined;
        item.waiting = undefined;
      }
      if (item.category !== 'projects') {
        item.items = [];
      }
      if (
        currentitem.parent !== 'standalone' &&
        item.parent !== currentitem.parent
      ) {
        await itemNotBelongsProject(currentitem);
      }
      if (item.parent !== 'standalone') {
        await itemBelongsProject(item);
      }
      await editItem(item);
    }

    //get and display the new item if it belongs to the current category
    if (currentcategory === item.category) {
      await getItems(currentcategory);
    } else if (currentcategory === 'focus') {
      await getItems('focus');
    } else if (currentcategory !== 'trash' && currentcategory !== 'tags') {
      await getItems(currentcategory);
    }
    setLoading(false);
    //reset form and close dialog
    hideDialog();
    //resetState();
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{maxHeight: '90%'}}>
          <Dialog.Title>New Action</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <Dialog.Content>
                <Text style={styles.title}>Action name</Text>
                <TextInput
                  placeholder="Enter name"
                  placeholderTextColor={colors.text}
                  value={item.name}
                  onChangeText={(text) => handleFormChange(text, 'name')}
                  style={{...styles.container,color: colors.text}}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  keyboardType={'visible-password'}
                />
                <Text style={styles.title}>Note or description</Text>
                <TextInput
                  placeholder="Enter note"
                  placeholderTextColor={colors.text}
                  value={item.note}
                  onChangeText={(text) => handleFormChange(text, 'note')}
                  style={{...styles.container,color: colors.text}}
                  multiline
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <SelectCategory
                  category={item.category}
                  setCategory={setCategory}
                />
                {item.category === 'waiting' ? (
                  <SelectWaiting
                    waiting={item.waiting}
                    setWaiting={setWaiting}
                  />
                ) : null}
                {item.category !== 'projects' &&
                item.category !== 'notebooks' &&
                item.category !== 'inbox' ? (
                  <SelectParent parent={item.parent} setParent={setParent} />
                ) : null}
                <SelectTag
                  selectedTagsId={selectedTagsId}
                  setSelectedTagsId={setSelectedTagsId}
                  setSelectedTags={setTags}
                />

                {item.category === 'scheduled' ? (
                  <SelectScheduledDateTime
                    scheduledDate={item.schedule}
                    setScheduledDate={setScheduledDate}
                  />
                ) : null}
                {item.category !== 'inbox' &&
                item.category !== 'notebooks' &&
                item.category !== 'scheduled' ? (
                  <SelectDueDate
                    duedate={item.dueDate}
                    setDueDate={setDueDate}
                  />
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
            <HelperText type="error" visible={erroritem}>
              Action name is required
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
  container: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 6,
    borderRadius: 2,
    height: 56,
    fontSize: 16,
    paddingLeft: 8,
  },
  title: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default NewItemDialog;
