import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import {Picker} from '@react-native-community/picker';
import itemsContext from '../context/items/itemsContext';

const SelectParent = ({parent, setParent}) => {
  const { colors } = useTheme();
  //get itemsState
	const itemlistContext = useContext(itemsContext);
	const {
		getProjects,
	} = itemlistContext;

  return (
    <>
    <Text style={styles.title}>Parent Project</Text>
    <View style={styles.container}>
        <Picker
          selectedValue={parent}
          style={{height: 56, color: colors.text}}
          onValueChange={(itemValue, itemIndex) =>
            setParent(itemValue)
          }>
			  <Picker.Item label={"Standalone"} value={"standalone"} />
			  {getProjects().map(project => (
				  <Picker.Item key ={project.id} label={project.name} value={project.id} />
			  ))}
        </Picker>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray', borderWidth: 1, marginVertical: 6, borderRadius: 2
  },
  title: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default SelectParent;
