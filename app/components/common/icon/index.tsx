import commonStyles from '../../../utils/commonStyles.utils';
import {Platform} from '../../../utils/platform';
import React, {memo, useEffect, useState} from 'react';
import type {ImageResizeMode, StyleProp, ViewStyle} from 'react-native';
import {Animated, Image} from 'react-native';
import FastImage, {ResizeMode} from 'react-native-fast-image';
// import type { ResizeMode } from 'react-native-fast-image'
// import FastImage from 'react-native-fast-image'

const _Icon = ({
  icon,
  errorIcon,
  size = 2.5,
  tintColor,
  style,
  ml,
  mr,
  mb,
  mt,
  mh,
  mv,
  pd,
  pt,
  pb,
  pl,
  pr,
  pv,
  ph,
  width,
  height,
  resizeMode = 'contain',
}: {
  errorIcon?: string;
  height?: number;
  icon: any;
  mb?: number;
  mh?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mv?: number;
  pb?: number;
  pd?: number;
  ph?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pv?: number;
  resizeMode?: ResizeMode;
  size?: number;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  tintColor?: string;
  width?: number;
}) => {
  const [source, setSource] = useState(icon);
  useEffect(() => {
    if (icon) {
      setSource(icon);
    }
  }, [icon]);

  return (
    <Animated.View
      style={[
        {
          height: height ?? Platform.SizeScale(size) * 10,
          width: width ?? Platform.SizeScale(size) * 10,
        },
        {
          marginBottom: mb,
          marginHorizontal: mh,
          marginLeft: ml,
          marginRight: mr,
          marginTop: mt,
          marginVertical: mv,
          padding: pd,
          paddingBottom: pb,
          paddingHorizontal: ph,
          paddingLeft: pl,
          paddingRight: pr,
          paddingTop: pt,
          paddingVertical: pv,
        },
        style,
      ]}>
      <FastImage
        onError={() => {
          setSource({
            uri: errorIcon,
          });
        }}
        tintColor={tintColor}
        resizeMode={resizeMode}
        style={commonStyles.image}
        source={source}
      />
    </Animated.View>
  );
};

export const Icon = memo(_Icon);
