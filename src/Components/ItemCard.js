import React,{useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Checkbox,
  IconButton,
  List,
  Menu,
  Surface
} from 'react-native-paper';

import {CheckBox as IconCheckBox} from 'react-native-elements';

const ItemCard = () => {
	const [donechecked, setDoneChecked] = useState(false);

	const [focuschecked, setFocusChecked] = useState(false);

	const [expanded, setExpanded] = useState(true);
  
	const [visible, setVisible] = useState(false);
  
	const openMenu = () => setVisible(true);
  
	const closeMenu = () => setVisible(false);
	

  return (
    <Card style={{borderRadius: 6, marginBottom: 6}}>
      <Card.Title
        title="Action Name"
        subtitle="Belongs to Project"
        left={(props) => (
          <Checkbox
            {...props}
            status={donechecked ? 'checked' : 'unchecked'}
            onPress={() => {
              setDoneChecked(!donechecked);
            }}
          />
        )}
        right={(props) => (
		  //<IconButton icon="dots-vertical" onPress={() => {}} />
		  <Surface style={{alignItems: 'center', flexDirection:'row-reverse'}}>
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
				<Menu.Item onPress={() => {}} title="Edit" />
				<Menu.Item onPress={() => {}} title="Delete" />
			</Menu>
			<IconCheckBox
			center
			iconType="material"
			checkedIcon="star"
			uncheckedIcon="star-outline"
			checkedColor="red"
			checked={focuschecked}
			onPress={() => setFocusChecked(!focuschecked)}
			/>
		</Surface>
		  
        )}
      />
      <Card.Content>
        <Paragraph>Tag1, Tag2, Tag3</Paragraph>
        <List.Accordion
          style={{padding: 0}}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}>
          <List.Item style={{padding: 0}} title="challaaaaaaaa" />
        </List.Accordion>
      </Card.Content>
    </Card>
  );
};

export default ItemCard;
