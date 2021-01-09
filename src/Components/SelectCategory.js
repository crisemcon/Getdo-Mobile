import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Picker} from '@react-native-community/picker';

const Category = [
  {label: 'Inbox', value: 'inbox'},
  {label: 'Next', value: 'next'},
  {label: 'Waiting', value: 'waiting'},
  {label: 'Scheduled', value: 'scheduled'},
  {label: 'Someday', value: 'someday'},
  {label: 'Projects', value: 'projects'},
  {label: 'Notebooks', value: 'notebooks'},
];

const SelectCategory = ({category, setCategory}) => {
  

  return (
    <View style={styles.container}>
        <Picker
          selectedValue={category}
          style={{height: 56}}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
			  {Category.map(category => (
				  <Picker.Item key ={category.value} label={category.label} value={category.value} />
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

export default SelectCategory;
