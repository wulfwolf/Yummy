import {Alert, Image, StyleSheet, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {Touchable} from '../../components/common/touchable/touchable';

const FoodItem = ({
  img,
  foodName,
  quantity,
  selected,
  valueHandle,
  value,
  unitCheck,
  isLiquid,
}: any) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Platform.SizeScale(20),
      }}>
      <Image
        source={{
          uri: img,
        }}
        style={{
          height: Platform.SizeScale(50),
          width: Platform.SizeScale(50),
          resizeMode: 'contain',
          marginRight: 30,
        }}
      />
      <Text
        style={{color: theme.colors.TEXT_BLACK, flex: 1}}
        fontType={theme.fonts.DMSansMedium}
        fontSize={theme.typography.fontSize.S}>
        {foodName}
      </Text>
      <View
        flex={2}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {selected ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              placeholder="nhập số lượng"
              placeholderTextColor={'fefefe'}
              style={{
                color: 'red',
                borderWidth: 0.5,
                padding: 3,
                maxWidth: 100,
                textAlign: 'center',
              }}
              keyboardType={'number-pad'}
              onChangeText={valueHandle}
              value={value}
            />
            <Text
              style={{
                color: theme.colors.TEXT_BLACK,
                marginHorizontal: Platform.SizeScale(15),
              }}
              fontType={theme.fonts.DMSansRegular}
              fontSize={theme.typography.fontSize.S}>
              gr/ml
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color: theme.colors.TEXT_BLACK,
              marginHorizontal: Platform.SizeScale(15),
            }}
            fontType={theme.fonts.DMSansMedium}
            fontSize={theme.typography.fontSize.S}>
            {quantity ? quantity : null}{' '}
            {isLiquid ? (unitCheck ? 'l' : 'ml') : unitCheck ? 'kg' : 'gr'}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FoodItem;
