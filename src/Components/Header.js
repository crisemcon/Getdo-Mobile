import React from 'react';
import {Appbar, useTheme, Switch, TouchableRipple} from 'react-native-paper';
import {PreferencesContext} from '../context/PreferencesContext';
import AsyncStorage from '@react-native-community/async-storage';

const Header = ({icon, title, navigation}) => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={title} />

      <Switch
        value={isThemeDark}
        onValueChange={async () => {
          toggleTheme();
          const data = !isThemeDark;
          //console.log(JSON.stringify(data));
          //JSON.stringify(AsyncStorage.getItem('theme'));
          await AsyncStorage.removeItem('theme')
          await AsyncStorage.setItem('theme', JSON.stringify(data))
        }}
        style={{marginRight: 6}}
      />
    </Appbar.Header>
  );
};

export default Header;
