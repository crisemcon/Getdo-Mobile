import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Checkbox,
  IconButton,
  List,
  Menu,
  Surface,
  Chip,
  Text,
} from 'react-native-paper';

import {CheckBox as IconCheckBox} from 'react-native-elements';
import itemsContext from '../context/items/itemsContext';
import NewItemDialog from '../Components/NewItemDialog';

const tagIcon = (tagtype) => {
  if (tagtype === 'label') {
    return 'label';
  } else if (tagtype === 'area') {
    return 'map-marker';
  }
  return 'account';
};

//calculate dueDate
const calcDueDate = (dueDate) => {
  const now = new Date();
  const elapsed = dueDate.getTime() - now.getTime();
  return timeConversion(elapsed);
};

function timeConversion(millisec) {
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
  const weeks = (days / 7).toFixed(0);

  if (hours < -24) {
    return `${days * -1} days late`;
  } else if (hours < 0 && hours >= -24) {
    return `Yesterday`;
  } else if (hours >= 0 && hours < 24) {
    return `Today`;
  } else if (hours >= 24 && hours < 48) {
    return `Tomorrow`;
  } else if (days >= 2 && days < 14) {
    return days + ' Days';
  } else {
    return `${weeks} weeks`;
  }
}

const calcTimeRequired = (time) => {
  if (time === 60) {
    return `1 hour`;
  } else if (time > 60) {
    return `${time / 60} hours`;
  }
  return `${time} minutes`;
};

const energyIcon = (energy) => {
  if (energy === 'Low') {
    return 'battery-20';
  } else if (energy === 'Medium') {
    return 'battery-50';
  } else return 'battery-80';
};

const ItemCard = ({item}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {
    getItems,
    focusItem,
    doneItem,
    getProjectById,
    editItem,
    saveCurrentItem,
    deleteItem,
    currentcategory,
  } = itemlistContext;

  const {
    name,
    done,
    focus,
    note,
    tags,
    parent,
    dueDate,
    time,
    energy,
    waiting,
    schedule,
  } = item;

  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleItemFocus = () => {
    focusItem(item);
    getItems(currentcategory);
  };

  const handleItemDone = () => {
    doneItem(item);
  };

  const handleItemDelete = () => {
    if (item.trash) {
      deleteItem(item);
      getItems('trash');
    } else {
      item.trash = true;
      editItem(item);
      getItems(currentcategory);
    }
  };

  const handleEditClick = () => {
    saveCurrentItem(item);
    setOpenDialog(true);
    closeMenu();
  };

  const handleRestoreClick = () => {
    item.trash = false;
    getItems('trash');
  };

  const handleNoteCheck = (line) => {
    const index = note.indexOf(line);
    let firstPart = note.substr(0, index);
    let lastPart = note.substr(index + 1);

    saveCurrentItem(item);

    if (line[0] === 'x') item.note = firstPart + '-' + lastPart;
    if (line[0] === '-') item.note = firstPart + 'x' + lastPart;

    editItem(item);
  };

  return (
    <>
      <Card style={{borderRadius: 6, marginBottom: 6}}>
        <Card.Title
          title={name}
          subtitle={
            parent !== 'standalone' ? getProjectById(item.parent)[0].name : null
          }
          left={(props) =>
            item.category !== 'notebooks' ? (
              <Checkbox
                {...props}
                status={done ? 'checked' : 'unchecked'}
                onPress={handleItemDone}
              />
            ) : (
              <Avatar.Icon size={36} icon="notebook" />
            )
          }
          right={(props) => (
            //<IconButton icon="dots-vertical" onPress={() => {}} />
            <Surface
              style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
                {item.trash ? (
                  <Menu.Item onPress={handleRestoreClick} title="Restore" />
                ) : (
                  <Menu.Item onPress={handleEditClick} title="Edit" />
                )}
                <Menu.Item onPress={handleItemDelete} title="Delete" />
              </Menu>
              <IconCheckBox
                center
                iconType="material"
                checkedIcon="star"
                uncheckedIcon="star-outline"
                checkedColor="red"
                checked={focus}
                onPress={handleItemFocus}
              />
            </Surface>
          )}
        />
        <Card.Content>
          <Surface style={styles.tagContainer}>
            {tags.length === 0
              ? null
              : tags.map((tag) => (
                  <React.Fragment key={tag.id}>
                    <Chip
                      mode="outlined"
                      icon={tagIcon(tag.type)}
                      style={styles.tag}>
                      {tag.name}
                    </Chip>
                  </React.Fragment>
                ))}
            {schedule ? (
              <Chip mode="outlined" icon="calendar-clock" style={styles.tag}>
                {schedule.toLocaleString()}
              </Chip>
            ) : null}
            {waiting ? (
              <Chip mode="outlined" icon="account-clock" style={styles.tag}>
                {waiting}
              </Chip>
            ) : null}
            {dueDate ? (
              <Chip mode="outlined" icon="calendar-remove" style={styles.tag}>
                {calcDueDate(dueDate)}
              </Chip>
            ) : null}
            {time ? (
              <Chip mode="outlined" icon="timer-sand" style={styles.tag}>
                {calcTimeRequired(time)}
              </Chip>
            ) : null}
            {energy ? (
              <Chip
                mode="outlined"
                icon={energyIcon(energy)}
                style={styles.tag}>
                {energy}
              </Chip>
            ) : null}
          </Surface>
          {note.length !== 0 ? (
            <List.Accordion
              style={{padding: 0}}
              expanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              {/*<List.Item
                style={{padding: 0}}
                titleNumberOfLines={100}
                title={}
              />*/}
              {item.note.split(/\n/).map((line) => {
                  if (line[0] === '-')
                    return (
                      <View key={line} style={{flexDirection:'row', minWidth: '100%', alignItems: 'center'}}>
                        <Checkbox
                          status={'unchecked'}
                          onPress={() => handleNoteCheck(line)}
                        />

                      <Text key={line} variant="body2">{line.slice(1)}</Text>
                      </View>
                    );
                  if (line[0] === 'x')
                    return (
                      <View key={line} style={{flexDirection:'row', minWidth: '100%', alignItems: 'center'}}>
                        <Checkbox
                          status={'checked'}
                          onPress={() => handleNoteCheck(line)}
                        />

                        <Text key={line} variant="body2">{line.slice(1)}</Text>
                        </View>
                    );
                  return (
                    <View key={line} style={{flexDirection:'row', minWidth: '100%',padding: 8}}>
                    <Text key={line} variant="body2">
                      {line}
                    </Text>
                    </View>
                  );
                })}
            </List.Accordion>
          ) : null}
        </Card.Content>
      </Card>
      {openDialog ? (
        <NewItemDialog visible={openDialog} setVisible={setOpenDialog} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    alignSelf: 'baseline',
    margin: 2,
  },
});

export default ItemCard;
