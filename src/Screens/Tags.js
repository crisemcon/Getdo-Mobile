import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List, Button, Surface} from 'react-native-paper';
import tagsContext from '../context/tags/tagsContext';
import itemsContext from '../context/items/itemsContext';
import {useFocusEffect} from '@react-navigation/native';
import TagCard from '../Components/TagCard';
import NewTagDialog from '../Components/NewTagDialog';
import Header from '../Components/Header';

const Tags = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {getItems, updateItemsDeletedTag} = itemlistContext;

  //get tagsState
  const tagContext = useContext(tagsContext);
  const {tags, deleteTag, fetchTags} = tagContext;
  const areaTags = tags.filter((tag) => tag.type === 'area');
  const labelTags = tags.filter((tag) => tag.type === 'label');
  const contactTags = tags.filter((tag) => tag.type === 'contact');

  useEffect(() => {
    fetchTags();
  }, []);

  const [expandedArea, setExpandedArea] = useState(true);
  const [expandedContact, setExpandedContact] = useState(true);
  const [expandedLabel, setExpandedLabel] = useState(true);

  const [visibleArea, setVisibleArea] = useState(false);
  const [visibleContact, setVisibleContact] = useState(false);
  const [visibleLabel, setVisibleLabel] = useState(false);

  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  /*useFocusEffect(
    useCallback(() => {
      getItems('tags');
    }, []),
  );*/

  //delete tag
  const handleTagDelete = (tagid) => {
    deleteTag(tagid);
    updateItemsDeletedTag(tagid);
    getItems('tags');
  };

  return (
    <>
      <Header title="Tags" navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 6}}>
          <List.Accordion
            title="Areas"
            expanded={expandedArea}
            onPress={() => setExpandedArea(!expandedArea)}>
            {areaTags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                handleTagDelete={handleTagDelete}
              />
            ))}
            <View style={{flex: 1, paddingHorizontal: 16}}>
              <Button
                icon="plus"
                mode="outlined"
                onPress={() => setVisibleArea(true)}>
                NEW AREA TAG
              </Button>
              {visibleArea ? (
                <NewTagDialog
                  type="area"
                  visible={visibleArea}
                  setVisible={setVisibleArea}
                />
              ) : null}
            </View>
          </List.Accordion>
          <List.Accordion
            title="Contacts"
            expanded={expandedContact}
            onPress={() => setExpandedContact(!expandedContact)}>
            {contactTags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                handleTagDelete={handleTagDelete}
              />
            ))}
            <View style={{flex: 1, paddingHorizontal: 16}}>
              <Button
                icon="plus"
                mode="outlined"
                onPress={() => setVisibleContact(true)}>
                NEW CONTACT TAG
              </Button>
              {visibleContact ? (
                <NewTagDialog
                  type="contact"
                  visible={visibleContact}
                  setVisible={setVisibleContact}
                />
              ) : null}
            </View>
          </List.Accordion>
          <List.Accordion
            title="Labels"
            expanded={expandedLabel}
            onPress={() => setExpandedLabel(!expandedLabel)}>
            {labelTags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                handleTagDelete={handleTagDelete}
              />
            ))}
            <View style={{flex: 1, paddingHorizontal: 16}}>
              <Button
                icon="plus"
                mode="outlined"
                onPress={() => setVisibleLabel(true)}>
                NEW LABEL TAG
              </Button>
              {visibleLabel ? (
                <NewTagDialog
                  type="label"
                  visible={visibleLabel}
                  setVisible={setVisibleLabel}
                />
              ) : null}
            </View>
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default Tags;
