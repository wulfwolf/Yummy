import React, {memo} from 'react';
import type {
  FlexAlignType,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {View as RNView} from 'react-native';

type Props = {
  alignItems?: FlexAlignType;
  backgroundColor?: string;
  borderColor?: any;
  borderRadius?: any;
  borderWidth?: any;
  bottom?: number;
  children?: React.ReactNode;
  flex?: number;
  left?: number;
  mg?: number;
  mb?: number;
  mh?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mv?: number;
  pb?: number;
  pd?: number;
  pl?: number;
  ph?: number;
  pv?: number;
  position?: 'absolute' | 'relative' | undefined;
  pr?: number;
  pt?: number;
  right?: number;
  zIndex?: number;
  style?: StyleProp<ViewStyle>;
  top?: number;
  width?: number | string;
  height?: number | string;
  overflow?: 'visible' | 'hidden' | 'scroll' | undefined;
  shadow?: any;
  onLayout?: (event: LayoutChangeEvent) => void;
};
const _View = ({
  children,
  style,
  mg,
  mt,
  mb,
  mv,
  mh,
  ml,
  mr,
  pd,
  pt,
  pb,
  pl,
  pr,
  ph,
  pv,
  flex,
  alignItems,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  width,
  height,
  overflow,
  shadow,
  onLayout,
}: Props) => {
  const styles: StyleProp<ViewStyle> = [
    {
      alignItems,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      flex,
      margin: mg,
      marginBottom: mb,
      marginHorizontal: mh,
      marginLeft: ml,
      marginRight: mr,
      marginTop: mt,
      marginVertical: mv,
      padding: pd,
      paddingBottom: pb,
      paddingLeft: pl,
      paddingRight: pr,
      paddingTop: pt,
      paddingHorizontal: ph,
      paddingVertical: pv,
      width,
      height,
      overflow,
      zIndex,
      ...shadow,
    },
    style,
  ];
  if (position) {
    styles.push({bottom, left, position, right, top});
  }
  return (
    <RNView onLayout={onLayout} style={styles}>
      {children}
    </RNView>
  );
};

export const View = memo(_View);
