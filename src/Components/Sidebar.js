import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React,{useContext} from 'react';
import {View} from 'react-native';
import { Divider, IconButton, useTheme, Text} from 'react-native-paper';
import itemsContext from "../context/items/itemsContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getActiveRouteState = function (routes, index, name) {
	return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  };

const Sidebar = ({...props}) => {
	const { colors} = useTheme();
	//get itemsState
	const itemlistContext = useContext(itemsContext);
	const { setCurrentCategory, getItems } = itemlistContext;
  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props}/>*/}
	  <View
      style={{
        height: 56,
        alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
      }}
    >
	<Icon name="triangle" color={colors.text} size={24}/>
      <Text style={{ color: colors.text, fontSize: 24, marginHorizontal: 4 }}>
        GETDO
      </Text>
    </View>
	<Divider />
      <DrawerItem
		label="Inbox"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Inbox'
		  )}
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
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Next'
		  )}
		onPress={() => {props.navigation.navigate('Next'); setCurrentCategory('next'); getItems('next')}}
		icon={() => <Icon
			name="chevron-double-right"
			size={16}
			color={colors.text}
		  />}
		
      />
	  <DrawerItem
		label="Waiting"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Waiting'
		  )}
		onPress={() => {props.navigation.navigate('Waiting'); setCurrentCategory('waiting'); getItems('waiting')}}
		icon={() => <Icon
			name="timer-sand"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Scheduled"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Scheduled'
		  )}
		onPress={() => {props.navigation.navigate('Scheduled'); setCurrentCategory('scheduled'); getItems('scheduled')}}
		icon={() => <Icon
			name="calendar"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Someday"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Someday'
		  )}
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
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Focus'
		  )}
		onPress={() => {props.navigation.navigate('Focus'); setCurrentCategory('focus'); getItems('focus')}}
		icon={() => <Icon
			name="star"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Tags"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Tags'
		  )}
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
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Projects'
		  )}
		onPress={() => {props.navigation.navigate('Projects'); setCurrentCategory('projects'); getItems('projects')}}
		icon={() => <Icon
			name="format-list-bulleted"
			size={16}
			color={colors.text}
		  />}
      />
	  <DrawerItem
		label="Notebooks"
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Notebooks'
		  )}
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
		focused={getActiveRouteState(
			props.state.routes,
			props.state.index,
			'Trash'
		  )}
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
