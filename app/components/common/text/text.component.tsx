/* eslint-disable no-param-reassign */
import useTheme from '../../../hooks/useTheme';
import {fontFamily} from '../../../utils/fonts.utils';
import React, {useCallback, useState} from 'react';
import {Linking, StyleSheet, Text as RCText, TextStyle} from 'react-native';
import ParsedText from 'react-native-parsed-text';

import type {ParsedTextProps} from './types';

const Text = ({
  style,
  isViewHtml,
  children,
  isLongText,
  numberOfLines,
  fontType = 'DMSansRegular',
  color,
  activeColor = color,
  textTransform = 'none',
  isPress = false,
  onPress,
  fontSize,
  ml,
  mr,
  mb,
  mt,
  mh,
  mv,
  textAlign,
  maxWidth,
  ...other
}: ParsedTextProps) => {
  const theme = useTheme();

  const textBase: TextStyle = {
    color: theme.colors.TEXT_BLACK,
    fontFamily: theme.fonts.default,
    fontSize: theme.typography.fontSize.M,
  };
  const onShouldStartLoadWithRequest = useCallback(req => {
    // open the link in native browser
    if (req.url.includes('http') || req.url.includes('tel')) {
      Linking.openURL(req.url);
      return false;
    }
    // returning false prevents WebView to navigate to new URL
    return true;
  }, []);

  if (style instanceof Array) {
    style.unshift(textBase);
  } else {
    style = StyleSheet.flatten([
      textBase,
      {color: isPress ? activeColor : color, textTransform},
      {
        marginBottom: mb,
        marginHorizontal: mh,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginVertical: mv,
      },
      {textAlign},
      fontSize ? {fontSize} : {},
      {maxWidth},
      style,
      {fontFamily: isPress ? theme.fonts.default : fontFamily[fontType]},
    ]);
  }

  // if (isViewHtml) {
  //   return (
  //     <AutoHeightWebView
  //       scrollEnabled={false}
  //       scrollEnabledWithZoomedin
  //       style={{
  //         width: Platform.deviceWidth
  //       }}
  //       customStyle={`

  //             `}
  //       source={
  //         typeof children === 'string'
  //           ? {
  //               uri: children.toString()
  //             }
  //           : {
  //               html: `<div>${children}</div>`
  //             }
  //       }
  //       {...{ onShouldStartLoadWithRequest }}
  //     />
  //   )
  // }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (isLongText) {
    return (
      <ParsedText
        allowFontScaling={false}
        numberOfLines={numberOfLines}
        style={style}
        {...other}>
        {children}
      </ParsedText>
    );
  }

  return (
    <ParsedText
      {...{onPress}}
      allowFontScaling={false}
      selectable
      numberOfLines={numberOfLines}
      {...other}
      style={style}>
      {children}
    </ParsedText>
  );
};

export {Text};
