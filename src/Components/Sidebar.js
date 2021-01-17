import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React,{useContext} from 'react';
import { Divider, IconButton, useTheme} from 'react-native-paper'
import itemsContext from "../context/items/itemsContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Sidebar = ({...props}) => {
	const { colors, fonts } = useTheme();
	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { setCurrentCategory, getItems } = itemlistContext;
  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props}/>*/}
      <DrawerItem
		label="Inbox"
		onPress={() => {props.navigation.navigate('Inbox'); setCurrentCategory('inbox'); getItems('inbox')}}
		icon={() => <Icon
			name="inbox"
			size={16}
			color={colors.text}
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Next"
		onPress={() => {props.navigation.navigate('Next'); setCurrentCategory('next'); getItems('next')}}
		icon={() => <Icon
			name="chevron-double-right"
			size={16}
			color={colors.text}
		  />}
		
      />
	  <DrawerItem
		label="Waiting"
		onPress={() => {props.navigation.navigate('Waiting'); setCurrentCategory('waiting'); getItems('waiting')}}
		icon={() => <Icon
			name="timer-sand"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Scheduled"
		onPress={() => {props.navigation.navigate('Scheduled'); setCurrentCategory('scheduled'); getItems('scheduled')}}
		icon={() => <Icon
			name="calendar"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Someday"
		onPress={() => {props.navigation.navigate('Someday'); setCurrentCategory('someday'); getItems('someday')}}
		icon={() => <Icon
			name="cake"
			size={16}
			color={colors.text}
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Focus"
		onPress={() => {props.navigation.navigate('Focus'); setCurrentCategory('focus'); getItems('focus')}}
		icon={() => <Icon
			name="star"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Tags"
		onPress={() => {props.navigation.navigate('Tags'); setCurrentCategory('tags');}}
		icon={() => <Icon
			name="tag"
			size={16}
			color={colors.text}
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Projects"
		onPress={() => {props.navigation.navigate('Projects'); setCurrentCategory('projects'); getItems('projects')}}
		icon={() => <Icon
			name="format-list-bulleted"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Notebooks"
		onPress={() => {props.navigation.navigate('Notebooks'); setCurrentCategory('notebooks'); getItems('notebooks')}}
		icon={() => <Icon
			name="notebook"
			size={16}
			color={colors.text}
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Trash"
		onPress={() => {props.navigation.navigate('Trash'); setCurrentCategory('trash'); getItems('trash')}}
		icon={() => <Icon
			name="delete"
			size={16}
			color={colors.text}
		  />}
      />
    </DrawerContentScrollView>
  );
};

export default Sidebar;
