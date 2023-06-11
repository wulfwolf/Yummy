import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Platform} from '../../utils/platform';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';

const FoodCard = ({img, recipeName}: any) => {
  return (
    <View
      style={{
        marginTop: Platform.SizeScale(8),
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: Platform.SizeScale(8),
        borderTopLeftRadius: 0,
      }}>
      <View>
        <Image
          source={{
            uri: img,
          }}
          style={{
            width: '100%',
            height: Platform.SizeScale(150),
            borderRadius: Platform.SizeScale(8),
          }}
        />
      </View>
      <View style={{position: 'absolute', top: 0}}>
        <Svg height={Platform.SizeScale(40)} width={Platform.deviceWidth - 9}>
          <Defs>
            <LinearGradient id="grad" x1="0.9" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor="#2d2d2d" stopOpacity="0" />
              <Stop offset="1" stopColor="#2b2b2b" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect width={'100%'} height={'100%'} fill="url(#grad)" />
        </Svg>

        <Text
          style={{
            position: 'absolute',
            top: Platform.SizeScale(10),
            left: Platform.SizeScale(10),
            color: '#e1e1e1',
          }}>
          {recipeName}
        </Text>
      </View>
    </View>
  );
};

export default FoodCard;
