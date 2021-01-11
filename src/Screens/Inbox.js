import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import NewItemDialog from '../Components/NewItemDialog';
import itemsContext from '../context/items/itemsContext';

const Inbox = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {
    categoryitems,
    getItems,
    deleteItem,
    updateItemsDeletedTag,
    saveCurrentItem,
    editItem,
  } = itemlistContext;

  const inboxItems= getItems('inbox');

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  return (
    <ScrollView style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Inbox" />
      </Appbar.Header>
      <NewItemDialog />
      <View style={{flex: 1, padding: 6}}>
        {inboxItems.map((item) =>
          item.done ? null : <ItemCard key={item.id} item={item} />,
        )}
        <List.Accordion title="Done" expanded={expanded} onPress={handlePress}>
          {inboxItems.map((item) =>
            item.done ? <ItemCard key={item.id} item={item} /> : null,
          )}
        </List.Accordion>
      </View>
    </ScrollView>
  );
};

export default Inbox;
