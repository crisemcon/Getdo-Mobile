import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
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
import Sidebar from './src/Components/Sidebar';

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import merge from 'deepmerge';

import ItemsState from './src/context/items/itemsState';
import TagState from './src/context/tags/tagsState';
import NewItemFAB from './src/Components/NewItemFAB';

import { PreferencesContext } from './src/context/PreferencesContext';

const Drawer = createDrawerNavigator();

const DefaultTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#03dac4',
    accent: '#03dac4',
  },
  fonts: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400'
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500'
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300'
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100'
    },
  }
};

const DarkTheme = {
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#03dac4",
    accent: "#03dac4",
  },
  fonts: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400'
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500'
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300'
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100'
    },
  }
};

const CombinedDefaultTheme = merge(NavigationDefaultTheme,DefaultTheme);
const CombinedDarkTheme = merge(NavigationDarkTheme,DarkTheme);

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(true);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
    <ItemsState>
      <TagState>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Drawer.Navigator
              initialRouteName="Inbox"
              backBehavior="initialRoute"
              drawerContent={(props) => <Sidebar {...props} />}>
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
          <NewItemFAB />
        </PaperProvider>
      </TagState>
    </ItemsState>
    </PreferencesContext.Provider>
  );
}
