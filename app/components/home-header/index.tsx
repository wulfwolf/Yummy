import {Animated, ImageBackground, StyleSheet, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {Images} from '../../utils/images';
import {Platform} from '../../utils/platform';

const _HomeHeader = ({img, headerHeight}: any) => {
  return (
    <Animated.View style={[{height: headerHeight ? headerHeight : null}]}>
      <ImageBackground
        source={img ? {uri: img} : Images.HEADER}
        style={{
          width: '100%',
          aspectRatio: 375 / 200,
          borderBottomLeftRadius: Platform.SizeScale(28),
          borderBottomRightRadius: Platform.SizeScale(28),
          overflow: 'hidden',
          zIndex: 2,
        }}
        resizeMode="cover"></ImageBackground>
    </Animated.View>
  );
};

export const HomeHeader = memo(_HomeHeader);

const styles = StyleSheet.create({});
