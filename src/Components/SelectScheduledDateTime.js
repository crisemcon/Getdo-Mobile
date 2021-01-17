import React, {useState, useContext} from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton, Text } from 'react-native-paper';


const SelectScheduledDateTime = ({scheduledDate, setScheduledDate}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
      setScheduledDate(selectedTime);
    }
  };

  const showDatepicker = () => {
    setShow(true)
  };

  return (
    <>
    <Text style={styles.title}>Schedule</Text>
    <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker} style={{flex:1,justifyContent: 'center', marginLeft: 8}}>
        <Text style={{fontSize: 16}}>{scheduledDate ? scheduledDate.toLocaleString() : 'Not set'}</Text>
        </TouchableOpacity>
        {scheduledDate ?
        <IconButton
            icon="close"
            size={20}
            onPress={() => setScheduledDate(null)}
          /> : null
        }
      {show && (
        <DateTimePicker
          minimumDate={new Date()}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray', borderWidth: 1, marginVertical: 6, borderRadius: 2, height: 56, flexDirection: 'row', alignItems: 'center'
  },
  title: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default SelectScheduledDateTime;
