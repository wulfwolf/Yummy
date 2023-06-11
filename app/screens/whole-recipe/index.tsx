import {FlatList, Image, TextInput} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import BackButton from '../../components/back-button';
import {ActivityIndicator} from 'react-native-paper';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Touchable} from '../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import commonStyles from '../../utils/commonStyles.utils';
import {addMyFoodAPI} from '../../components/product-item/api';
import {RecipeT} from '../../../effector/src/constants/types';
const WholeRecipe = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [changeInput, setChangeInput] = useState(false);
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState<RecipeT>([]);
  const navigation = useNavigation();
  const {recipes, myFood, accessToken, user} = useStore(globalState.$store);

  const searchToggleHandle = () => {
    setChangeInput(!changeInput);
  };
  const favoriteHandle = useCallback(
    async item => {
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
    },
    [accessToken, myFood, recipes, user._id],
  );

  const submitHandle = () => {
    const tmp = [];
    recipes.map(recipe => {
      if (recipe.recipeName.toLowerCase().includes(text.toLowerCase())) {
        tmp.push(recipe);
      }
    });
    setSearchResult(tmp);
  };

  const renderItems = useCallback(
    ({item}: any) => {
      return (
        <View width={Platform.SizeScale(180)}>
          <Touchable onPress={() => navigation.navigate('RecipeDetail', item)}>
            <View key={item.id} mg={Platform.SizeScale(10)}>
              <Image
                source={{uri: item.img}}
                style={{
                  width: Platform.SizeScale(150),
                  height: Platform.SizeScale(150),
                  alignSelf: 'center',
                  borderRadius: Platform.SizeScale(8),
                }}
              />
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
                  <Touchable onPress={() => favoriteHandle(item)}>
                    {myFood &&
                    myFood.length > 0 &&
                    myFood.map(e => e?._id === item._id).includes(true) ? (
                      <Icon
                        icon={Icons.HeartActive}
                        size={theme.typography.iconSize.M}
                      />
                    ) : (
                      <Icon
                        icon={Icons.HEART}
                        size={theme.typography.iconSize.M}
                      />
                    )}
                  </Touchable>
                </View>
              </View>
              <Text
                numberOfLines={1}
                color="black"
                fontType={theme.fonts.DMSansItalic}
                fontSize={theme.typography.fontSize.S}
                style={{alignSelf: 'center'}}>
                {item.recipeName}
              </Text>
            </View>
          </Touchable>
        </View>
      );
    },
    [
      favoriteHandle,
      myFood,
      navigation,
      theme.colors.TEXT_BLACK,
      theme.colors.WHITE,
      theme.fonts.DMSansItalic,
      theme.typography.fontSize.S,
      theme.typography.iconSize.M,
    ],
  );

  return (
    <View flex={1} backgroundColor={theme.colors.WHITE}>
      <View style={{alignItems: 'center'}}>
        <BackButton />
        <View
          mt={Platform.SizeScale(25)}
          style={{zIndex: 999}}
          position="absolute"
          right={Platform.SizeScale(20)}>
          <Touchable onPress={searchToggleHandle}>
            <Icon icon={Icons.SEARCH} size={theme.typography.iconSize.M} />
          </Touchable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <View
            height={Platform.SizeScale(70)}
            style={{justifyContent: 'center'}}>
            {!changeInput ? (
              <Text
                color="black"
                fontType={theme.fonts.DMSansBold}
                fontSize={theme.typography.fontSize.XL}
                style={{
                  fontWeight: 'bold',
                }}>
                Tất cả các công thức
              </Text>
            ) : (
              <TextInput
                onSubmitEditing={submitHandle}
                onChangeText={searchtext => setText(searchtext)}
                placeholder="Hãy tìm những món ăn ưa thích ở đây!"
                placeholderTextColor={'black'}
                style={{
                  backgroundColor: theme.colors.LIGHT_GRAY,
                  paddingHorizontal: Platform.SizeScale(40),
                  borderRadius: 8,
                  color: 'black',
                }}
              />
            )}
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchResult.length > 0 ? searchResult : recipes}
          renderItem={renderItems}
          numColumns={2}
          contentContainerStyle={{paddingBottom: Platform.SizeScale(80)}}
        />
      </View>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={'green'}
        style={{position: 'absolute', alignSelf: 'center', bottom: 0}}
      />
    </View>
  );
};

export default WholeRecipe;
