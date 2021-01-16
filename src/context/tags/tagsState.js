import React, { useReducer } from "react";
import tagsContext from "./tagsContext";
import tagsReducer from "./tagsReducer";
import AsyncStorage from '@react-native-community/async-storage';

import { v4 as uuid } from "uuid";

import {ADD_TAG, VALIDATE_TAG, DELETE_TAG, UPDATE_TAG, CURRENT_TAG, UNSELECT_TAG, FETCH_TAGS } from "../../types";

const TagsState = (props) => {
	const initialState = {
		tags: [/*
			{ id: 1, name: "Universidad", type: "area" },
			{ id: 2, name: "Mariella", type: "contact" },
			{ id: 3, name: "Computador", type: "label" },
			{ id: 4, name: "Casa", type: "area" },
			{ id: 5, name: "Bastianex", type: "contact" },
			{ id: 6, name: "Celular", type: "label" },*/
		],
		errortag: false,
		currenttag: null,
	};
	
	//create dispatch and state
	const [state, dispatch] = useReducer(tagsReducer, initialState);

	//FUNCTIONS
	//fetch items from db
	const fetchTags = async () => {
		//await AsyncStorage.clear();
		try {
		  const keys = await AsyncStorage.getAllKeys();
		  const result = await AsyncStorage.multiGet(keys);
		  const filter = result.filter(keyvalue => keyvalue[0][0] === "#")
	  		const tags = filter.map((keyvalue) => JSON.parse(keyvalue[1]));
		  dispatch({
			type: FETCH_TAGS,
			payload: tags,
		  });
		} catch (e) {
		  alert('Failed to load the data from the storage');
		}
	  };
	//get tags by ids (array)
	const getTags = tagsid => {
		const tagsArray = state.tags.filter(function(tag){
			return tagsid.indexOf(tag.id) !== -1;
		})
		return tagsArray;
	};

	//add new item
	const addTag = async tag => {
		try {
			tag.id = '#' + uuid();
			await AsyncStorage.setItem(tag.id, JSON.stringify(tag));
			dispatch({
			  type: ADD_TAG,
			  payload: tag,
			});
		  } catch (e) {
			alert('Failed to save the data to the storage');
		  }
	};

	//validate the itemname and display an error if it is empty
	const validateTag = () => {
		dispatch({
			type: VALIDATE_TAG,
		});
	};

	//permanently deletes a tag by its id
	const deleteTag = async (tagId) => {
		try {
			await AsyncStorage.removeItem(tagId);
			dispatch({
				type: DELETE_TAG,
				payload: tagId,
			});
		  } catch (e) {
			alert('Failed to delete the data in the storage');
		  }
		
	};

	//updates a tag
	const updateTag = async (tag) => {
		try {
			await AsyncStorage.mergeItem(tag.id, JSON.stringify(tag));
			dispatch({
				type: UPDATE_TAG,
				payload: tag,
			})
		  } catch (e) {
			alert('Failed to edit the data in the storage');
		  }
		
	}

	//extracts a tag to edit
	const saveCurrentTag = tag => {
		dispatch({
			type: CURRENT_TAG,
			payload: tag,
		})
	}

	//unselect current tag
	const unselectCurrentTag = () => {
		dispatch({
			type: UNSELECT_TAG,
		})
	}


	return (
		<tagsContext.Provider value={{
			tags: state.tags,
			errortag: state.errortag,
			currenttag: state.currenttag,
			getTags,
			addTag,
			validateTag,
			deleteTag,
			updateTag,
			saveCurrentTag,
			unselectCurrentTag,
			fetchTags,
		}}>{props.children}</tagsContext.Provider>
	);
};

export default TagsState;
