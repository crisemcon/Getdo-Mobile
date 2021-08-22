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
import {StatusBar, View, Text, Image, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import merge from 'deepmerge';

import ItemsState from './src/context/items/itemsState';
import TagState from './src/context/tags/tagsState';
import NewItemFAB from './src/Components/NewItemFAB';

import {PreferencesContext} from './src/context/PreferencesContext';
import {DefaultTheme, DarkTheme} from './src/theme';

import RNBootSplash from 'react-native-bootsplash';

import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const CombinedDefaultTheme = merge(NavigationDefaultTheme, DefaultTheme);
const CombinedDarkTheme = merge(NavigationDarkTheme, DarkTheme);

const slides = [
  {
    key: 'one',
    title: 'CAPTURE',
    text:
      'Capture anything that crosses your mind, nothing is too big or small!\nThese items go directly into your inbox.\n\nYour mind is for having ideas, not holding them!',
    image: require('./src/assets/capture.png'),
    backgroundColor: '#F2DDC0'
  },
  {
    key: 'two',
    title: 'CLARIFY',
    text:
      "Process what you've captured into concrete action steps.\n\nYou'll decide which category the item belongs",
    image: require('./src/assets/clarify.png'),
    backgroundColor: '#A09CF3'
  },
  {
    key: 'three',
    title: 'ORGANIZE',
    text:
      'Put everything in the right place: You can add tags, dates, time required and more!',
    image: require('./src/assets/organize.png'),
    backgroundColor: '#ADEAC3'
  },
  {
    key: 'four',
    title: 'REVIEW',
    text:
      'Frequently look over, update and revise your lists.\n\n Do smaller daily reviews and bigger weekly ones',
    image: require('./src/assets/review.png'),
    backgroundColor: '#E7A8E3'
    
  },
  {
    key: 'five',
    title: 'ENGAGE',
    text:
      'Get to work on the important stuff!\n\nUse GETDO to know exactly what to work on when',
    image: require('./src/assets/action.png'),
    backgroundColor: '#90DAD9'
  },
];

const _renderItem = ({item}) => {
  return (
    <View style={{...styles.slide, backgroundColor: item.backgroundColor}}>
      <Text style={styles.introTitleStyle}>{item.title}</Text>
      <Image
        resizeMode="contain"
        style={styles.introImageStyle}
        source={item.image}
      />
      <Text style={styles.introTextStyle}>{item.text}</Text>
    </View>
  );
};

export default function App() {
  const [slider, setSlider] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      const resultSlider = await AsyncStorage.getItem('sliderShown');
      const resultTheme = await AsyncStorage.getItem('theme');
      if(resultSlider === null) {
        await AsyncStorage.setItem('sliderShown', 'true');
        setSlider(true);
      } 
      if(JSON.parse(resultTheme) === null) {
        await AsyncStorage.setItem('theme', JSON.stringify(false));
      } else if(JSON.parse(resultTheme) === true) {
        setIsThemeDark(true)
      }
    }
    init().then(RNBootSplash.hide({fade: true}))
    //asyncstorage to see intro silder
  }, []);

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {slider ? (
        <>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            onDone={() => setSlider(false)}
          />
        </>
      ) : (
        <ItemsState>
          <TagState>
            <PaperProvider theme={theme}>
              <NavigationContainer theme={theme}>
                <StatusBar
                  backgroundColor={
                    isThemeDark
                      ? DarkTheme.colors.background
                      : DefaultTheme.colors.primary
                  }
                  barStyle={isThemeDark ? 'light-content' : 'dark-content'}
                />
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
      )}
    </PreferencesContext.Provider>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 100,
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  introImageStyle: {
    width: '100%',
    height: 250,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
