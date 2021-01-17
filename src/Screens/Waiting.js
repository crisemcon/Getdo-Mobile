import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import itemsContext from '../context/items/itemsContext';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../Components/Header';

const Waiting = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {getItems, waitingitems} = itemlistContext;

  /*useEffect(() => {
    getItems("waiting");
  }, [])*/

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  /*useFocusEffect(
    useCallback(() => {
      getItems("waiting");
    }, [])
  );*/

  return (
    <>
      <Header title="Waiting" navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 6}}>
          {waitingitems.map((item) =>
            item.done ? null : <ItemCard key={item.id} item={item} />,
          )}
          <List.Accordion
            title="Done"
            expanded={expanded}
            onPress={handlePress}>
            {waitingitems.map((item) =>
              item.done ? <ItemCard key={item.id} item={item} /> : null,
            )}
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default Waiting;
