import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  absolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  column: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  row1: {
    flexDirection: 'row',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.1,

    shadowRadius: 5,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});

export const globalStyle = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  directionColumm: {
    flexDirection: 'column',
  },
  directionRow: {
    flexDirection: 'row',
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  fullContainer: {
    flex: 1,
    flexGrow: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
});

export default commonStyles;
