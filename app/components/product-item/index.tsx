import React, {useState} from 'react';
import {Platform} from '../../utils/platform';
import commonStyles from '../../utils/commonStyles.utils';
import {View} from '../common/view/view.component';
import {Text} from '../common/text/text.component';
import {useStyleProductItem} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Touchable} from '../common/touchable/touchable';
import useTheme from '../../hooks/useTheme';
import {LazyImage} from '../lazy-image';
import {Icon} from '../common/icon';
import {Icons} from '../../utils/icons';
import {globalState} from '../../../effector';
import {RecipeT} from '../../../effector/src/constants/types';
import {useStore} from 'effector-react';
import {addMyFoodAPI} from './api';
// import {databases} from '../../../api/api';

type Props = {
  width?: number;
  item: RecipeT;
  beLovedList?: boolean;
  index?: number;
};
const ProductItem = ({
  width = Platform.SizeScale(220),
  item,
  beLovedList,
  index,
}: Props) => {
  const navigation = useNavigation();
  const styles = useStyleProductItem(width);
  const theme = useTheme();
  const {accessToken, myFood, user, recipes} = useStore(globalState.$store);
  const checkLovedList = () => {
    switch (index) {
      case 0:
        return {icon: Icons.CROWNGOLD, txt: '1st'};
      case 1:
        return {icon: Icons.CROWNEPIC, txt: '2nd'};
      case 2:
        return {icon: Icons.CROWNBRONZE, txt: '3rd'};
      default:
        return {};
    }
  };

  const favoriteHandle = async () => {
    try {
      await addMyFoodAPI({accessToken, item, foodArray: myFood});
      const {favorite} = item;

      if (favorite.includes(user._id)) {
        const FavoriteIndex = favorite.indexOf(user._id);
        favorite.splice(FavoriteIndex, 1);

        const ItemIndex = recipes.indexOf(item);
        recipes.splice(ItemIndex, 1, item);

        globalState.action.getRecipeAction(recipes);
      } else {
        favorite.push(user._id);

        globalState.action.getRecipeAction(recipes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View width={width}>
      <Touchable
        onPress={async () => {
          navigation.navigate('RecipeDetail', item);
        }}
        style={{
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 1,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: Platform.SizeScale(20),
        }}>
        <LazyImage
          resizeMode="cover"
          source={{uri: item.img}}
          style={styles.cover}
          useLoading
        />
      </Touchable>
      <View
        width="90%"
        position="absolute"
        style={[
          commonStyles.row,
          commonStyles.spaceBetween,
          {alignSelf: 'center'},
        ]}
        top={Platform.SizeScale(10)}>
        <View
          pd={Platform.SizeScale(8)}
          backgroundColor={theme.colors.WHITE}
          style={[commonStyles.row]}
          borderRadius={Platform.SizeScale(8)}>
          <Icon icon={Icons.STAR} size={theme.typography.iconSize.M} />
          <Text
            fontSize={theme.typography.fontSize.S}
            color={theme.colors.TEXT_BLACK}>
            {item.favorite?.length}
          </Text>
        </View>
        <View
          pd={Platform.SizeScale(8)}
          backgroundColor={theme.colors.WHITE}
          borderRadius={Platform.SizeScale(8)}>
          <Touchable onPress={favoriteHandle}>
            {myFood &&
            myFood.length > 0 &&
            myFood.map(e => e?._id === item._id).includes(true) ? (
              <Icon
                icon={Icons.HeartActive}
                size={theme.typography.iconSize.M}
              />
            ) : (
              <Icon icon={Icons.HEART} size={theme.typography.iconSize.M} />
            )}
          </Touchable>
        </View>
      </View>
      {beLovedList ? (
        <View
          width="90%"
          position="absolute"
          style={[
            commonStyles.row,
            commonStyles.spaceBetween,
            {alignSelf: 'center'},
          ]}
          top={Platform.SizeScale(60)}>
          <View
            pd={Platform.SizeScale(8)}
            backgroundColor={index < 3 ? theme.colors.WHITE : ''}
            style={[commonStyles.row]}
            borderRadius={Platform.SizeScale(8)}>
            <Icon
              icon={checkLovedList()?.icon}
              size={theme.typography.iconSize.M}
            />
            <Text
              fontType={theme.fonts.DMSansItalic}
              fontSize={theme.typography.fontSize.S}
              color={theme.colors.TEXT_BLACK}>
              {checkLovedList()?.txt}
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.SizeScale(16),
        }}>
        <Icon icon={Icons.CULINARY} size={theme.typography.iconSize.S} />
        <Text numberOfLines={1} color={theme.colors.TEXT_BLACK}>
          {` ${item.recipeName}`}
        </Text>
      </View>
    </View>
  );
};

export default ProductItem;
