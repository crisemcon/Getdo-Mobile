import React, {useState, useContext} from 'react';
import {List, Surface, Menu, IconButton} from 'react-native-paper';
import tagsContext from '../context/tags/tagsContext';
import NewTagDialog from '../Components/NewTagDialog';

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
  //get tags State
  const tagContext = useContext(tagsContext);
  const {saveCurrentTag} = tagContext;

  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = () => {
    saveCurrentTag(tag);
    setOpenDialog(true);
    closeMenu();
  }

  return (
    <>
    <List.Item
      key={tag.id}
      title={tag.name}
      left={(props) => <List.Icon {...props} icon={tagIcon(tag.type)} />}
      right={(props) => (
        //<IconButton icon="dots-vertical" onPress={() => {}} />
          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item onPress={handleEditClick} title="Edit" />
            
            <Menu.Item onPress={() => handleTagDelete(tag.id)} title="Delete" />
          </Menu>
      )}
    />
    {openDialog ? (
									<NewTagDialog visible={openDialog} setVisible={setOpenDialog} />
								) : null}
    </>
  );
};

export default TagCard;
