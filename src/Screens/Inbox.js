import React, {useState,useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import NewItemDialog from '../Components/NewItemDialog';

const Inbox = ({navigation}) => {
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
        <ItemCard />
        <ItemCard />
        <List.Accordion title="Done" expanded={expanded} onPress={handlePress}>
          <ItemCard />
          <ItemCard />
        </List.Accordion>
      </View>
    </ScrollView>
  );
};



export default Inbox;
