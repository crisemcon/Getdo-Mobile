import React, {useReducer} from 'react';
import itemsContext from './itemsContext';
import itemsReducer from './itemsReducer';
import AsyncStorage from '@react-native-community/async-storage';

import {v4 as uuid} from 'uuid';

import {
  ITEM_CATEGORIE,
  ADD_ITEM,
  VALIDATE_ITEM,
  DELETE_ITEM,
  FOCUS_ITEM,
  UPDATE_ITEMSTAG,
  UPDATE_ITEMSDELETEDTAG,
  DONE_ITEM,
  CURRENT_ITEM,
  EDIT_ITEM,
  UNSELECT_ITEM,
  CURRENT_CATEGORY,
  FETCH_ITEMS,
  /*
	UPDATE_ITEM,
	ITEM_STATE,
	CURRENT_ITEM,*/
} from '../../types';

const ItemsState = (props) => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const initialState = {
    items: [
      /*{
				id: 1,
				category: "inbox",
				name: "test inbox1",
				note: "- asdasas",
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 2,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				done: false,
				tags: [{ id: 1, name: "Universidad", type: "area" }],
				parent: 3,
				items: [],
				trash: false,
			},
			{
				id: 3,
				category: "projects",
				name: "test project",
				note: lorem,
				focus: false,
				done: false,
				tags: [{ id: 3, name: "Computador", type: "label" }],
				items: [2, 6, 8],
				trash: false,
				parent: "standalone",
			},
			{
				id: 4,
				category: "notebooks",
				name: "test name",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 5,
				category: "inbox",
				name: "test inbox2",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 6,
				category: "inbox",
				name: "test inbox3",
				note: lorem,
				focus: true,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 3,
				items: [],
				trash: false,
			},
			{
				id: 7,
				category: "waiting",
				name: "test waiting",
				note: lorem,
				focus: false,
				done: false,
				tags: [{ id: 3, name: "Computador", type: "label" }],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 8,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: true,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
				parent: 3,
				items: [],
				trash: false,
			},
			{
				id: 9,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 10,
				category: "trash",
				name: "test trash",
				note: lorem,
				focus: true,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 11,
				category: "trash",
				name: "test trash",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 12,
				category: "next",
				name: "test next",
				note: lorem,
				focus: true,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 13,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: false,
				done: false,
				tags: [{ id: 2, name: "Mariella", type: "contact" }],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 14,
				category: "notebooks",
				name: "test name",
				note: lorem,
				focus: true,
				done: false,
				tags: [{ id: 1, name: "Universidad", type: "area" }],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 15,
				category: "next",
				name: "test next",
				note: lorem,
				focus: true,
				tags: [{ id: 3, name: "Computador", type: "label" }],
				parent: "standalone",
				items: [],
				trash: false,
			},
			{
				id: 16,
				category: "inbox",
				name: "test inbox4",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
				items: [],
				trash: false,
			},
			{
				id: 17,
				category: "someday",
				name: "test someday",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },

					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
				items: [],
				trash: false,
			},
			{
				id: 18,
				category: "waiting",
				name: "test waiting",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				parent: 19,
				items: [],
				trash: false,
			},
			{
				id: 19,
				category: "projects",
				name: "test project 2",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
					{ id: 3, name: "Computador", type: "label" },
				],
				items: [16, 17, 18],
				parent: "standalone",
				trash: false,
			},
			{
				id: 20,
				category: "next",
				name: "test next",
				note: lorem,
				focus: false,
				done: false,
				tags: [
					{ id: 1, name: "Universidad", type: "area" },
					{ id: 2, name: "Mariella", type: "contact" },
				],
				parent: "standalone",
				items: [],
				trash: false,
			},*/
    ],
    inboxitems: [],
    nextitems: [],
    waitingitems: [],
    scheduleditems: [],
    somedayitems: [],
    focusitems: [],
    projectsitems: [],
    notebooksitems: [],
    trashitems: [],
    erroritem: false,
    currentitem: null,
    currentcategory: 'inbox',
  };

  //create dispatch and state
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  //FUNCTIONS
  //fetch items from db
  const fetchItems = async () => {
    //await AsyncStorage.clear();
    try {
      const keys = await AsyncStorage.getAllKeys();
	  const result = await AsyncStorage.multiGet(keys);
	  const filter = result.filter(keyvalue => keyvalue[0][0] === "@")
	  const items = filter.map((keyvalue) => JSON.parse(keyvalue[1]));
      dispatch({
        type: FETCH_ITEMS,
        payload: items,
      });
    } catch (e) {
      alert('Failed to load the data from the storage');
    }
  };
  //selects the current category
  const setCurrentCategory = (categoryname) => {
    dispatch({
      type: CURRENT_CATEGORY,
      payload: categoryname,
    });
  };

  //get items from selected category
  const getItems = (category) => {
    dispatch({
      type: ITEM_CATEGORIE,
      payload: category,
    });
  };

  //add new item
  const addItem = async (item) => {
    try {
      item.id = '@' + uuid();
      await AsyncStorage.setItem(item.id, JSON.stringify(item));
      dispatch({
        type: ADD_ITEM,
        payload: item,
      });
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  //validate the itemname and display an error if it is empty
  const validateItem = () => {
    dispatch({
      type: VALIDATE_ITEM,
    });
  };

  //permanently deletes an item by its id
  const deleteItem = async (item) => {
    try {
      await AsyncStorage.removeItem(item.id);
      dispatch({
        type: DELETE_ITEM,
        payload: item,
      });
    } catch (e) {
      alert('Failed to delete the data in the storage');
    }
  };

  //focus or unfocus an item
  const focusItem = async (item) => {
    const selectedItem = state.items.filter(
      (currentItem) => currentItem.id === item.id,
    )[0];
    selectedItem.focus = !item.focus;
    await editItem(selectedItem);
    /*dispatch({
      type: FOCUS_ITEM,
      payload: item,
    });*/
  };

  //done or undone an item
  const doneItem = async (item) => {
    const selectedItem = state.items.filter(
      (currentItem) => currentItem.id === item.id,
    )[0];
    selectedItem.done = !item.done;
    await editItem(selectedItem);
    /*
    dispatch({
      type: DONE_ITEM,
      payload: item,
    });*/
  };

  //update item when tagState is modified
  const updateItemsTag = (tag) => {
    state.items.forEach((currentItem) => {
      currentItem.tags.forEach((currentTag) =>
        currentTag.id === tag.id
          ? ((currentTag.name = tag.name), editItem(currentItem))
          : null,
      );
      if (currentItem.waiting) {
        if (currentItem.waiting.id === tag.id) {
          currentItem.waiting.name = tag.name;
          editItem(currentItem);
        }
      }
    });
    /*dispatch({
      type: UPDATE_ITEMSTAG,
      payload: tag,
    });*/
  };

  //update items when a tag is deleted
  const updateItemsDeletedTag = (tagId) => {
    state.items.forEach((item) => {
      const newTags = item.tags.filter((tag) => tag.id !== tagId);
      item.tags = newTags;
      if (item.waiting) {
        if (item.waiting.id === tagId) {
          item.waiting = null;
        }
      }
    });
    /*dispatch({
      type: UPDATE_ITEMSDELETEDTAG,
      payload: tagId,
    });*/
  };

  //get items by id for projects, so trash items are not called
  const getItemsById = (itemsid) => {
    const itemArray = state.items.filter(function (item) {
      return itemsid.indexOf(item.id) !== -1 && !item.trash;
    });
    return itemArray;
  };

  //get projects
  const getProjects = () => {
    return state.items.filter((item) => item.category === 'projects');
  };

  //attach item to project
  const itemBelongsProject = (item) => {
    const project = state.items.filter(
      (project) => project.id === item.parent,
    )[0];
    project.items.push(item.id);
    editItem(project);
    /*
    state.items
      .filter((project) => project.id === item.parent)[0]
      .items.push(item.id);*/
  };

  //dettach item to project
  const itemNotBelongsProject = (item) => {
    const project = state.items.filter(
      (project) => project.id === item.parent,
    )[0];
    project.items = project.items.filter(
      (projectItemId) => projectItemId !== item.id,
    );
    editItem(project);
  };

  //get project by id
  const getProjectById = (projectId) => {
    return state.items.filter((item) => item.id === projectId);
  };

  //extracts an item to edit
  const saveCurrentItem = (item) => {
    dispatch({
      type: CURRENT_ITEM,
      payload: item,
    });
  };

  //edits an item
  const editItem = async (item) => {
    try {
      await AsyncStorage.mergeItem(item.id, JSON.stringify(item));
      dispatch({
        type: EDIT_ITEM,
        payload: item,
      });
    } catch (e) {
      alert('Failed to edit the data in the storage');
    }
  };

  //unselect current item
  const unselectCurrentItem = () => {
    dispatch({
      type: UNSELECT_ITEM,
    });
  };

  return (
    <itemsContext.Provider
      value={{
        items: state.items,
        //categoryitems: state.categoryitems,
        erroritem: state.erroritem,
        currentitem: state.currentitem,
        inboxitems: state.inboxitems,
        nextitems: state.nextitems,
        waitingitems: state.waitingitems,
        scheduleditems: state.scheduleditems,
        somedayitems: state.somedayitems,
        focusitems: state.focusitems,
        projectsitems: state.projectsitems,
        notebooksitems: state.notebooksitems,
        trashitems: state.trashitems,
        currentcategory: state.currentcategory,
        getItems,
        addItem,
        validateItem,
        deleteItem,
        focusItem,
        updateItemsTag,
        updateItemsDeletedTag,
        getItemsById,
        getProjects,
        itemBelongsProject,
        getProjectById,
        doneItem,
        saveCurrentItem,
        editItem,
        unselectCurrentItem,
        setCurrentCategory,
        itemNotBelongsProject,
        fetchItems,
      }}>
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemsState;
