import React from 'react';
import {Appbar, useTheme, Switch, TouchableRipple} from 'react-native-paper';
import { PreferencesContext } from '../context/PreferencesContext';

const Header = ({icon, title, navigation}) => {
	const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={title} />

        <Switch
		  value={isThemeDark}
      onValueChange={toggleTheme}
      style={{marginRight: 6}}
        />

    </Appbar.Header>
  );
};

export default Header;
