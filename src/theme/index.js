import {
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
  } from 'react-native-paper';

export const DefaultTheme = {
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
		fontWeight: '400',
	  },
	  medium: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '500',
	  },
	  light: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '300',
	  },
	  thin: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '100',
	  },
	},
  };
  
  export const DarkTheme = {
	...PaperDarkTheme,
	roundness: 2,
	colors: {
	  ...PaperDarkTheme.colors,
	  primary: '#03dac4',
	  accent: '#03dac4',
	},
	fonts: {
	  regular: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '400',
	  },
	  medium: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '500',
	  },
	  light: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '300',
	  },
	  thin: {
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontWeight: '100',
	  },
	},
  };