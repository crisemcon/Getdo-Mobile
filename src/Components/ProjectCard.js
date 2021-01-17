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
  Divider,
  useTheme,
} from 'react-native-paper';

import {CheckBox as IconCheckBox} from 'react-native-elements';
import itemsContext from '../context/items/itemsContext';
import ItemCard from './ItemCard';
import NewItemDialog from './NewItemDialog';
import {calcDueDate, calcProjectTimeRequired, tagIcon} from '../functions';

const ProjectCard = ({item}) => {
  const {colors} = useTheme();
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {
    getItems,
    focusItem,
    doneItem,
    getProjectById,
    getItemsById,
    editItem,
    saveCurrentItem,
    deleteItem,
    currentcategory,
  } = itemlistContext;

  const {name, done, focus, note, tags, dueDate} = item;

  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [opendialog, setOpenDialog] = useState(false);

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
    <Card style={{borderRadius: 6, marginBottom: 6}}>
      <Card.Title
        title={name}
        left={(props) => (
          <Checkbox
            {...props}
            status={done ? 'checked' : 'unchecked'}
            onPress={handleItemDone}
          />
        )}
        right={(props) => (
          //<IconButton icon="dots-vertical" onPress={() => {}} />
          <View style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
              <Menu.Item onPress={() => {}} title="Edit" />
              <Menu.Item onPress={handleItemDelete} title="Delete" />
            </Menu>
            <IconCheckBox
              center
              iconType="material"
              checkedIcon="star"
              uncheckedIcon="star-outline"
              checkedColor={colors.primary}
              checked={focus}
              onPress={handleItemFocus}
            />
          </View>
        )}
      />
      <Card.Content>
        <View style={styles.tagContainer}>
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
          {dueDate ? (
            <Chip mode="outlined" icon="calendar-remove" style={styles.tag}>
              {calcDueDate(dueDate)}
            </Chip>
          ) : null}
          {item.items.length !== 0 ? (
            <Chip mode="outlined" icon="timer-sand" style={styles.tag}>
              {calcProjectTimeRequired(getItemsById(item.items))}
            </Chip>
          ) : null}
        </View>
        <List.Accordion
          style={{padding: 0}}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}>
          {note.length !== 0
            ? item.note.split(/\n/).map((line) => {
                if (line[0] === '-')
                  return (
                    <View
                      key={line}
                      style={{
                        flexDirection: 'row',
                        minWidth: '100%',
                        alignItems: 'center',
                      }}>
                      <Checkbox
                        status={'unchecked'}
                        onPress={() => handleNoteCheck(line)}
                      />

                      <Text key={line} variant="body2">
                        {line.slice(1)}
                      </Text>
                    </View>
                  );
                if (line[0] === 'x')
                  return (
                    <View
                      key={line}
                      style={{
                        flexDirection: 'row',
                        minWidth: '100%',
                        alignItems: 'center',
                      }}>
                      <Checkbox
                        status={'checked'}
                        onPress={() => handleNoteCheck(line)}
                      />

                      <Text key={line} variant="body2">
                        {line.slice(1)}
                      </Text>
                    </View>
                  );
                return (
                  <View
                    key={line}
                    style={{
                      flexDirection: 'row',
                      minWidth: '100%',
                      padding: 8,
                    }}>
                    <Text key={line} variant="body2">
                      {line}
                    </Text>
                  </View>
                );
              })
            : null}
          <Divider style={{marginTop: 8}}/>
          {item.items.length !== 0 //!== undefined ,if this get errors
            ? getItemsById(item.items).map((item) => (
                <React.Fragment key={item.id}>
                  <ItemCard item={item} />
                  <Divider light />
                </React.Fragment>
              ))
            : null}
        </List.Accordion>
        <View style={{flex: 1}}>
          <Button
            icon="plus"
            mode="outlined"
            onPress={() => setOpenDialog(true)}>
            NEW PROJECT ACTION
          </Button>
          {opendialog ? (
            <NewItemDialog
              visible={opendialog}
              setVisible={setOpenDialog}
              projectId={item.id}
            />
          ) : null}
        </View>
      </Card.Content>
    </Card>
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

export default ProjectCard;
