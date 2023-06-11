import {View} from '../../components/common/view/view.component';
// import {HomeHeader} from '../../components/home-header';
import {RecipeList} from '../../components/recipe-list';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  View as RnView,
} from 'react-native';
import {HomeHeader} from '../../components/home-header';
import {getFavoriteFoodAPI, getNotificationsAPI, getRecipeAPI} from './api';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import HeaderRight from './headerRight';
import HeaderLeft from './headerLeft';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Text} from '../../components/common/text/text.component';
import {Touchable} from '../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import {getScheduleAPI} from '../schedule/api';
import {calculateKcal} from '../../utils/function';

const Home = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {recipes, accessToken, user} = useStore(globalState.$store);
  const theme = useTheme();
  const breakfast = recipes.filter(recipe => recipe.meal === 'Bữa sáng');
  const lunch = recipes.filter(recipe => recipe.meal === 'Bữa trưa');
  const dinner = recipes.filter(recipe => recipe.meal === 'Bữa tối');
  const newRecipes = recipes.slice().reverse();
  const beLovedRecipe = recipes.sort((a, b) => {
    return b?.favorite.length - a?.favorite.length;
  });
  const dietRecipe = recipes.filter(i => {
    return calculateKcal({preparations: i.preparations}) < 500;
  });
  const gainWeightRecipe = recipes.filter(i => {
    return calculateKcal({preparations: i.preparations}) > 500;
  });

  const navigation = useNavigation();
  useEffect(() => {
    getRecipeAPI();
    getFavoriteFoodAPI({accessToken, _id: user?._id});
    getScheduleAPI(accessToken);
    getNotificationsAPI({accessToken});
  }, [accessToken, user?._id]);

  return (
    <View backgroundColor={theme.colors.BACKGROUND_COLOR} flex={2}>
      <HeaderRight />
      <HeaderLeft />
      <HomeHeader />

      <Touchable
        style={{
          alignSelf: 'center',
          position: 'absolute',
          marginTop: Platform.SizeScale(110),
          zIndex: 999,
        }}
        onPress={() => navigation.navigate('RecipeUp', undefined)}>
        <Text
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}
          color={theme.colors.LIGHT_GRAY}
          style={{fontStyle: 'italic'}}>
          Chọn món ngay!
        </Text>
        <Image
          source={require('../../../assets/icons/cooking.png')}
          style={{
            height: Platform.SizeScale(100),
            width: Platform.SizeScale(100),
            zIndex: 999,
          }}
        />
      </Touchable>
      {recipes && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animatedValue}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingBottom: 80, paddingTop: 30}}>
          <View pb={Platform.SizeScale(10)}>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Công thức được yêu thích'}
              data={beLovedRecipe}
              beLovedList={true}
            />
          </View>
          <View pb={Platform.SizeScale(10)}>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Công thức mới'}
              data={newRecipes}
            />
          </View>
          <View>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Bữa sáng'}
              caloRange={'(200 - 500)'}
              data={breakfast}
            />
          </View>

          <View>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Bữa trưa'}
              caloRange={'(500 - 700)'}
              data={lunch}
            />
          </View>
          <View pb={Platform.SizeScale(10)}>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              caloRange={'(500 - 800)'}
              title={'Bữa tối'}
              data={dinner}
            />
          </View>
          <View pb={Platform.SizeScale(10)}>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Khẩu phần ăn kiêng'}
              data={dietRecipe}
            />
          </View>
          <View pb={Platform.SizeScale(10)}>
            <RecipeList
              widthItems={Platform.SizeScale(150)}
              title={'Khẩu phần tăng cân'}
              data={gainWeightRecipe}
            />
          </View>
        </ScrollView>
      )}
      {/* </Animated.View> */}
    </View>
  );
};

export default Home;
