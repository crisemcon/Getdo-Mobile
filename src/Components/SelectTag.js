import React, {useRef, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Text, useTheme} from 'react-native-paper';

import tagsContext from '../context/tags/tagsContext';


const SelectTag = ({selectedTagsId, setSelectedTagsId, setSelectedTags}) => {
  const { colors, fonts } = useTheme();
  //get tagsState
  const tagContext = useContext(tagsContext);
  const {tags} = tagContext;
  const areaTags = tags.filter((tag) => tag.type === 'area');
  const contactTags = tags.filter((tag) => tag.type === 'contact');
  const labelTags = tags.filter((tag) => tag.type === 'label');

  const items = [
    // this is the parent or 'item'
    {
      name: 'Areas',
      id: 0,
      children: areaTags,
    },
    {
      name: 'Contacts',
      id: 1,
      children: contactTags,
    },
    {
      name: 'Labels',
      id: 2,
      children: labelTags,
    }
  ];
  
  return (
    <View>
      <Text style={styles.title}>Tags</Text>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Select Tags"
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={setSelectedTagsId}
        onSelectedItemObjectsChange	={setSelectedTags}
        selectedItems={selectedTagsId}
        styles={{selectToggle: styles.container}}
        showCancelButton
        itemFontFamily={fonts.regular}
        subItemFontFamily={fonts.regular}
        searchTextFontFamily={fonts.regular}
        confirmFontFamily={fonts.regular}
        selectToggleIconComponent={<Icon name="arrow-drop-down" size={24} color={colors.backdrop}/>}
        colors={{selectToggleTextColor: colors.text, primary: colors.primary, cancel: colors.backdrop, success: colors.accent}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 6,
    borderRadius: 2,
    height: 56,
    alignContent: 'center',
    paddingHorizontal: 8,
    paddingRight: 12
  },
  title: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default SelectTag;
