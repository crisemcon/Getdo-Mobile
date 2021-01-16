import React, {useState, useContext} from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from 'react-native-paper';


const SelectDueDate = ({duedate, setDueDate}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDueDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true)
  };

  return (
    <View style={styles.container}>
      
        <TouchableOpacity onPress={showDatepicker} style={{flex:1,justifyContent: 'center', marginLeft: 10}}>
        <Text style={{fontSize: 16}}>{duedate ? duedate.toDateString() : 'Due Date'}</Text>
        </TouchableOpacity>
      
      {/*<View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>*/}
      {show && (
        <DateTimePicker
          minimumDate={new Date()}
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray', borderWidth: 1, marginVertical: 6, borderRadius: 2, height: 56
  },
});

export default SelectDueDate;
