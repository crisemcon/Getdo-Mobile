import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import itemsContext from '../context/items/itemsContext';
import tagsContext from '../context/tags/tagsContext';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../Components/Header';

const Inbox = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {getItems, inboxitems, fetchItems} = itemlistContext;
  //get tagsState
  const tagContext = useContext(tagsContext);
  const {fetchTags} = tagContext;

  useEffect(() => {
    async function fetchData() {
      await fetchItems();
      await fetchTags();
      await getItems('inbox');
    }
    fetchData();
  }, []);

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  /*useFocusEffect(
    useCallback(() => {
      getItems("inbox");
    }, [])
  );*/

  return (
    <>
      <Header title="Inbox" navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 6}}>
          {inboxitems.map((item) =>
            item.done ? null : <ItemCard key={item.id} item={item} />,
          )}
          <List.Accordion
            title="Done"
            expanded={expanded}
            onPress={handlePress}>
            {inboxitems.map((item) =>
              item.done ? <ItemCard key={item.id} item={item} /> : null,
            )}
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default Inbox;
