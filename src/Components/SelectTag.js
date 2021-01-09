import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
  // this is the parent or 'item'
  {
    name: 'Areas',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Home',
        id: 1,
      },
      {
        name: 'University',
        id: 2,
      },
    ],
  },
  {
    name: 'Labels',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Computer',
        id: 3,
      },
      {
        name: 'Smartphone',
        id: 4,
      },
    ],
  },
  {
    name: 'Contacts',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Mariella',
        id: 5,
      },
      {
        name: 'Cristian',
        id: 6,
      },
    ],
  },
];

const SelectTag = () => {
  const ref = useRef(null);
  // ref.current._toggleSelector()
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <View>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Tags"
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
        styles={{selectToggle: styles.container}}
      />
      {/*<Button onPress={() => ref?.current?._toggleSelector()} />*/}
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
  },
});

export default SelectTag;
