import {COLORS} from '../utils/colors.utils';
import {fontFamily} from '../utils/fonts.utils';
import {typography} from '../utils/typography.utils';
import React from 'react';

const colors = {
  PRIMARY: COLORS.PRIMARY,
  ...COLORS,
};
const fonts = {
  default: fontFamily.DMSansRegular,
  ...fontFamily,
};

Object.keys(fonts as any).map((key, index) => {
  fonts[key] = key;
});

export type ThemeT = {
  colors: typeof colors;
  typography: typeof typography;
  fonts: typeof fonts;
  shadowCard: any;
};
export const ThemeContext = React.createContext<ThemeT>({});

const ThemeProvider = ({children}) => {
  const isLightTheme = true; // this is temporary, we will get back to it later

  const shadowCard = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  };
  const theme = {
    colors,
    fonts,
    typography,
    shadowCard,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
