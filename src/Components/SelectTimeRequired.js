import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {Picker} from '@react-native-community/picker';

const Times = [
  {label: 'Not set', value: undefined},
  {label: '5 minutes', value: 5},
  {label: '10 minutes', value: 10},
  {label: '15 minutes', value: 15},
  {label: '30 minutes', value: 30},
  {label: '45 minutes', value: 45},
  {label: '1 hour', value: 60},
  {label: '2 hours', value: 120},
  {label: '4 hours', value: 240},
  {label: '6 hours', value: 360},
];

const SelectTimeRequired = ({time, setTimeRequired}) => {

  return (
    <View style={styles.container}>
        <Picker
          selectedValue={time}
          style={{height: 56}}
          onValueChange={(itemValue, itemIndex) =>
            setTimeRequired(itemValue)
          }>
			  {Times.map(time => (
				  <Picker.Item key ={time.label} label={time.label} value={time.value} />
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

export default SelectTimeRequired;
