import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const COLORS = {
  //base
  primary: '#0d131c',

  //input
  inputBox: '#6c2191',

  //inputText
  inputText: '#e8e8e8',

  //border,icon
  //#2085ac
  borderBox: '#23238a',

  //bordercolor
  borderColor: '#17175b',

  //lightgray
  placeholder: '#b1b1bc',
};

const SIZES = {
  //global size
  font: 24,
  icon: 26,
  padding: 10,
  radius: 8,
  heightSlider: 200,

  //fonts size
  h1: 24,
  h2: 22,
  h3: 17,
  h4: 14,

  // app dimensions
  width,
  height,
};

const FONTS = {
  bold: {
    fontFamily: 'karla-bold',
    fontSize: SIZES.font,
  },
  normal: {
    fontFamily: 'karla-regular',
    fontSize: SIZES.h4,
    textColor: COLORS.inputText,
  },
  greet: {
    fontFamily: 'holligate-signature-demo.regular',
    fontSize: SIZES.font,
  },
};

export {COLORS, SIZES, FONTS};
