import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {Picker} from '@react-native-community/picker';
import itemsContext from '../context/items/itemsContext';

const Category = [
  {label: 'Inbox', value: 'inbox'},
  {label: 'Next', value: 'next'},
  {label: 'Waiting', value: 'waiting'},
  {label: 'Scheduled', value: 'scheduled'},
  {label: 'Someday', value: 'someday'},
  {label: 'Projects', value: 'projects'},
  {label: 'Notebooks', value: 'notebooks'},
];

const SelectParent = ({parent, setParent}) => {
  //get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		getProjects,
	} = itemlistContext;

  return (
    <View style={styles.container}>
        <Picker
          selectedValue={parent}
          style={{height: 56}}
          onValueChange={(itemValue, itemIndex) =>
            setParent(itemValue)
          }>
			  <Picker.Item label={"Standalone"} value={"standalone"} />
			  {getProjects().map(project => (
				  <Picker.Item key ={project.id} label={project.name} value={project.id} />
			  ))}
        </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray', borderWidth: 1, marginVertical: 6, borderRadius: 2
  },
});

export default SelectParent;
