import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
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
} from 'react-native-paper';

import {CheckBox as IconCheckBox} from 'react-native-elements';
import itemsContext from '../context/items/itemsContext';
import ItemCard from './ItemCard';

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
    return days + " Days";
  } else {
    return `${weeks} weeks`;
  }
}

//calculate project time required
export const calcProjectTimeRequired = (items) => {
	let sumTime = 0;
	let flag = "";
	items.forEach((item) => {
		item.time ? (sumTime += item.time) : (flag = ">");
	});
	if (sumTime === 0) {
		return `Not set`;
	} else if (sumTime === 60) {
		return `${flag}1 hour`;
	} else if (sumTime > 60) {
		return `${flag}${(sumTime / 60).toFixed(0)} hours`;
	}
	return `${flag}${sumTime} minutes`;
};

const ProjectCard = ({item}) => {
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
    currentcategory
  } = itemlistContext;

  const {
    name,
    done,
    focus,
    note,
    tags,
    dueDate,
  } = item;

  const [expanded, setExpanded] = useState(true);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
			getItems("trash");
		} else {
			item.trash = true;
			editItem(item);
			getItems(currentcategory);
		}
  }

  const handleNoteCheck = (line) => {
		const index = note.indexOf(line);
		let firstPart = note.substr(0, index);
		let lastPart = note.substr(index + 1);

		saveCurrentItem(item);

		if (line[0] === "x") item.note = firstPart + "-" + lastPart;
		if (line[0] === "-") item.note = firstPart + "x" + lastPart;

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
          <Surface style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
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
                  <Chip mode="outlined" icon={tagIcon(tag.type)} style={styles.tag}>
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
        </Surface>
        <List.Accordion
          style={{padding: 0}}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}>
          <List.Item style={{padding: 0}} titleNumberOfLines={100} title={item.note.split(/\n/).map((line) => {
						if (line[0] === "-")
							return (
								<React.Fragment key={line}>
									<Checkbox
										status={'unchecked'}
										onPress={() => handleNoteCheck(line)}
									/>

									{line.slice(1)}
								</React.Fragment>
							);
						if (line[0] === "x")
							return (
								<React.Fragment key={line}>
									<Checkbox
										status={'checked'}
										onPress={() => handleNoteCheck(line)}
									/>

									{line.slice(1)}
								</React.Fragment>
							);
						return <Text key={line} variant="body2">{line}</Text>;
					})} />
					<Divider/>
					{item.items.length !== 0 //!== undefined ,if this get errors
						? getItemsById(item.items).map((item) => (
								<React.Fragment key={item.id}>
									<ItemCard
										item={item}
									/>
									<Divider light />
								</React.Fragment>
						  ))
						: null}
        </List.Accordion>
		{
			//TODO: add button to add new project item
		}
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
