import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import itemsContext from '../context/items/itemsContext';
import {useFocusEffect} from '@react-navigation/native';

const Scheduled = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {getItems, scheduleditems} = itemlistContext;

  /*useEffect(() => {
    getItems("scheduled");
  }, [])*/

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  /*useFocusEffect(
    useCallback(() => {
      getItems("scheduled");
    }, [])
  );*/

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Scheduled" />
      </Appbar.Header>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 6}}>
          {scheduleditems.map((item) =>
            item.done ? null : <ItemCard key={item.id} item={item} />,
          )}
          <List.Accordion
            title="Done"
            expanded={expanded}
            onPress={handlePress}>
            {scheduleditems.map((item) =>
              item.done ? <ItemCard key={item.id} item={item} /> : null,
            )}
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default Scheduled;
