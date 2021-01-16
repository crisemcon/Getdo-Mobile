import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React,{useContext} from 'react';
import { Divider, IconButton, Surface, Title} from 'react-native-paper'
import itemsContext from "../context/items/itemsContext";



const Sidebar = ({...props}) => {
	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { setCurrentCategory, getItems } = itemlistContext;
  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props}/>*/}
      <DrawerItem
		label="Inbox"
		onPress={() => {props.navigation.navigate('Inbox'); setCurrentCategory('inbox'); getItems('inbox')}}
		icon={() => <IconButton
			icon="inbox"
			size={16}
			disabled
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Next"
		onPress={() => {props.navigation.navigate('Next'); setCurrentCategory('next'); getItems('next')}}
		icon={() => <IconButton
			icon="chevron-double-right"
			size={16}
			disabled
		  />}
      />
	  <DrawerItem
		label="Waiting"
		onPress={() => {props.navigation.navigate('Waiting'); setCurrentCategory('waiting'); getItems('waiting')}}
		icon={() => <IconButton
			icon="timer-sand"
			size={16}
			disabled
		  />}
      />
	  <DrawerItem
		label="Scheduled"
		onPress={() => {props.navigation.navigate('Scheduled'); setCurrentCategory('scheduled'); getItems('scheduled')}}
		icon={() => <IconButton
			icon="clock-outline"
			size={16}
			disabled
		  />}
      />
	  <DrawerItem
		label="Someday"
		onPress={() => {props.navigation.navigate('Someday'); setCurrentCategory('someday'); getItems('someday')}}
		icon={() => <IconButton
			icon="cake"
			size={16}
			disabled
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Focus"
		onPress={() => {props.navigation.navigate('Focus'); setCurrentCategory('focus'); getItems('focus')}}
		icon={() => <IconButton
			icon="star"
			size={16}
			disabled
		  />}
      />
	  <DrawerItem
		label="Tags"
		onPress={() => {props.navigation.navigate('Tags'); setCurrentCategory('tags');}}
		icon={() => <IconButton
			icon="tag"
			size={16}
			disabled
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Projects"
		onPress={() => {props.navigation.navigate('Projects'); setCurrentCategory('projects'); getItems('projects')}}
		icon={() => <IconButton
			icon="format-list-bulleted"
			size={16}
			disabled
		  />}
      />
	  <DrawerItem
		label="Notebooks"
		onPress={() => {props.navigation.navigate('Notebooks'); setCurrentCategory('notebooks'); getItems('notebooks')}}
		icon={() => <IconButton
			icon="notebook"
			size={16}
			disabled
		  />}
      />
	  <Divider />
	  <DrawerItem
		label="Trash"
		onPress={() => {props.navigation.navigate('Trash'); setCurrentCategory('trash'); getItems('trash')}}
		icon={() => <IconButton
			icon="delete"
			size={16}
			disabled
		  />}
      />
    </DrawerContentScrollView>
  );
};

export default Sidebar;
