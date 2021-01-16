import React, {useState, useEffect, useContext,useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import itemsContext from '../context/items/itemsContext';
import { useFocusEffect } from '@react-navigation/native';

const Trash = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {
    getItems,
    trashitems,
  } = itemlistContext;

  useEffect(() => {
    getItems("trash");
  }, [])

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE
  
  /*useFocusEffect(
    useCallback(() => {
      getItems("trash");
    }, [])
  );*/

  return (
    <ScrollView style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Trash" />
      </Appbar.Header>
      <View style={{flex: 1, padding: 6}}>
        {trashitems.map((item) =>
          item.done ? null : <ItemCard key={item.id} item={item} />,
        )}
        <List.Accordion title="Done" expanded={expanded} onPress={handlePress}>
          {trashitems.map((item) =>
            item.done ? <ItemCard key={item.id} item={item} /> : null,
          )}
        </List.Accordion>
      </View>
    </ScrollView>
  );
};

export default Trash;
