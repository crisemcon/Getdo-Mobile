import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Inbox from './src/Screens/Inbox';
import Next from './src/Screens/Next';
import Waiting from './src/Screens/Waiting';
import Scheduled from './src/Screens/Scheduled';
import Someday from './src/Screens/Someday';
import Focus from './src/Screens/Focus';
import Tags from './src/Screens/Tags';
import Projects from './src/Screens/Projects';
import Notebooks from './src/Screens/Notebooks';
import Trash from './src/Screens/Trash';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import ItemsState from './src/context/items/itemsState';

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <ItemsState>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="GETDO">
            <Drawer.Screen name="Inbox" component={Inbox} />
            <Drawer.Screen name="Next" component={Next} />
            <Drawer.Screen name="Waiting" component={Waiting} />
            <Drawer.Screen name="Scheduled" component={Scheduled} />
            <Drawer.Screen name="Someday" component={Someday} />
            <Drawer.Screen name="Focus" component={Focus} />
            <Drawer.Screen name="Tags" component={Tags} />
            <Drawer.Screen name="Projects" component={Projects} />
            <Drawer.Screen name="Notebooks" component={Notebooks} />
            <Drawer.Screen name="Trash" component={Trash} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ItemsState>
  );
}
