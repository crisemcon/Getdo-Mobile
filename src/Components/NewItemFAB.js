import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import NewItemDialog from './NewItemDialog';
import {Portal, FAB} from 'react-native-paper';

const NewItemFAB = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  return (
	  <>
    <Portal>
      <FAB style={styles.fab} icon="plus" onPress={showDialog} />
    </Portal>
	{visible ? <NewItemDialog visible={visible} setVisible={setVisible} /> : null}
	</>
  );
};

const styles = StyleSheet.create({
	fab: {
	  position: 'absolute',
	  margin: 16,
	  right: 0,
	  bottom: 0,
	},
  });

export default NewItemFAB;
