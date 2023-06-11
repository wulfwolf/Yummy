import {ScrollView, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {View} from '../common/view/view.component';
import {Platform} from '../../utils/platform';
import {Text} from '../common/text/text.component';
import commonStyles from '../../utils/commonStyles.utils';
import ProductItem from '../product-item';
import useTheme from '../../hooks/useTheme';
import {Touchable} from '../common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import {RecipeT} from '../../../effector/src/constants/types';
type Props = {
  title?: string;
  widthItems?: number;
  data: RecipeT[];
  caloRange?: string;
  beLovedList?: boolean;
};
const _RecipeList = ({
  title,
  widthItems,
  data,
  caloRange,
  beLovedList,
}: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const wholeClick = async () => {
    navigation.navigate('WholeRecipe', undefined);
  };

  return (
    <View>
      <View
        mh={Platform.SizeScale(20)}
        mv={Platform.SizeScale(10)}
        style={[commonStyles.row, commonStyles.spaceBetween]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            fontType={theme.fonts.DMSansBold}
            fontSize={theme.typography.fontSize.XL}
            color={theme.colors.TEXT_BLACK}>
            {title}
          </Text>
          {caloRange && (
            <Text
              fontType={theme.fonts.DMSansItalic}
              fontSize={theme.typography.fontSize.S}
              color={theme.colors.TEXT_BLACK}>
              {` - khuyến nghị ${caloRange}calo`}
            </Text>
          )}
        </View>
        <Touchable onPress={wholeClick}>
          <Text
            fontType={theme.fonts.DMSansMedium}
            fontSize={theme.typography.fontSize.L}
            color={theme.colors.ORANGE}
            style={{textDecorationLine: 'underline'}}>
            tất cả
          </Text>
        </Touchable>
      </View>
      <View>
        <ScrollView
          horizontal
          style={{marginHorizontal: 10}}
          showsHorizontalScrollIndicator={false}>
          {data &&
            data.map((recipe, index) => {
              return (
                <View mh={Platform.SizeScale(12)} key={index}>
                  <ProductItem
                    item={recipe}
                    width={widthItems}
                    beLovedList={beLovedList}
                    index={index}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export const RecipeList = memo(_RecipeList);

const styles = StyleSheet.create({});
