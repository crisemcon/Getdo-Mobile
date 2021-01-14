import React, {useState} from 'react';
import {List, Surface, Menu, IconButton} from 'react-native-paper';

const tagIcon = (tagtype) => {
	if(tagtype === "label"){
		return "label"
	}
	else if (tagtype === "area"){
		return "map-marker"
	} 
	return "account"
}

const TagCard = ({tag, handleTagDelete}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <List.Item
      key={tag.id}
      title={tag.name}
      left={(props) => <List.Icon {...props} icon={tagIcon(tag.type)} />}
      right={(props) => (
        //<IconButton icon="dots-vertical" onPress={() => {}} />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item onPress={() => handleTagDelete(tag.id)} title="Delete" />
          </Menu>
      )}
    />
  );
};

export default TagCard;
