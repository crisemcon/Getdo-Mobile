import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Picker} from '@react-native-community/picker';

const Energies = [
  {label: 'Not set', value: undefined},
  {label: 'Low', value: "Low"},
  {label: 'Medium', value: "Medium"},
  {label: 'High', value: "High"},
];

const SelectTimeRequired = ({energy, setEnergyRequired}) => {

  return (
    <>
    <Text style={styles.title}>Energy Required</Text>
    <View style={styles.container}>
        <Picker
          selectedValue={energy}
          style={{height: 56, color: '#333'}}
          onValueChange={(itemValue, itemIndex) =>
            setEnergyRequired(itemValue)
          }>
			  {Energies.map(energy => (
				  <Picker.Item key ={energy.label} label={energy.label} value={energy.value} />
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

export default SelectTimeRequired;
