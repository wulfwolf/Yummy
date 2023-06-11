import {Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Touchable} from '../../components/common/touchable/touchable';
import {RecipeList} from '../../components/recipe-list';
import {getRecipeWithOptionsAPI} from './api';
import {ActivityIndicator} from 'react-native-paper';
import {kcalRange, meals} from './__mocks__/data';
import {getStoredFood} from '../fridge/api';

const RecipeUp = () => {
  const theme = useTheme();
  const {storedFoods, accessToken, recipes} = useStore(globalState.$store);

  const [selectFood, setSelectFood] = useState({
    foodName: null,
    type: null,
    kcalRange: null,
    _id: null,
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  useEffect(() => {
    getStoredFood(accessToken);
  }, [accessToken]);
  const suggestHandle = async () => {
    setLoading(true);
    const tmp = await getRecipeWithOptionsAPI({
      accessToken: accessToken,
      foodName: selectFood.foodName,
      type: selectFood.type,
      kcalRange: selectFood.kcalRange,
      _id: selectFood._id,
    });
    setResponse(tmp);
    setLoading(false);
  };
  const selectHandle = food => {
    const {ingredient, type, range} = food;

    if (ingredient?.foodName === selectFood.foodName) {
      setSelectFood({
        ...selectFood,
        foodName: null,
        _id: null,
      });
    } else if (type === selectFood.type) {
      setSelectFood({
        ...selectFood,
        type: null,
      });
    } else if (range === selectFood.kcalRange) {
      setSelectFood({
        ...selectFood,
        kcalRange: null,
      });
    } else if (ingredient) {
      setSelectFood({
        ...selectFood,
        foodName: ingredient.foodName,
        _id: ingredient._id,
      });
    } else if (range) {
      setSelectFood({...selectFood, kcalRange: range});
    } else {
      setSelectFood({
        ...selectFood,
        type: type,
      });
    }
  };
  const renderItems = index => {
    var cards = [];
    for (let i = index; i < storedFoods?.length; i += 2) {
      cards.push(
        <Touchable onPress={() => selectHandle(storedFoods[i])} key={i}>
          <View
            style={{
              padding: 1,
              paddingHorizontal: 3,
              flexDirection: 'row',
              borderRadius: 5,
              borderWidth: 1,
              alignItems: 'center',
              margin: 3,
              backgroundColor:
                storedFoods[i].ingredient.foodName === selectFood.foodName
                  ? theme.colors.ORANGE
                  : 'white',
            }}>
            {storedFoods[i].ingredient.foodName !== selectFood.foodName ? (
              <Image
                source={{uri: storedFoods[i].ingredient.img}}
                style={{height: 30, width: 30}}
              />
            ) : (
              <Icon icon={Icons.ORANGECHECK} size={2} />
            )}
            <Text
              selectable={false}
              style={{color: theme.colors.TEXT_BLACK, marginLeft: 3}}
              color="black"
              fontSize={theme.typography.fontSize.s}>
              {storedFoods[i].ingredient.foodName}
            </Text>
          </View>
        </Touchable>,
      );
    }
    return <View style={{flexDirection: 'row'}}>{cards}</View>;
  };
  return (
    <View flex={1} backgroundColor={theme.colors.WHITE}>
      <View
        style={{
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
        }}>
        <Text
          style={{color: theme.colors.TEXT_BLACK}}
          mt={Platform.SizeScale(20)}
          mb={Platform.SizeScale(20)}
          ml={Platform.SizeScale(15)}
          color="black"
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}>
          Lên thực đơn
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: theme.colors.TEXT_BLACK,
            margin: Platform.SizeScale(10),
            fontWeight: 'bold',
          }}
          color="black"
          fontSize={theme.typography.fontSize.s}>
          Vui lòng chọn thực phẩm hiện có trong tủ lạnh để có thể gợi ý món ăn!
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            maxHeight: Platform.SizeScale(80),
          }}
          contentContainerStyle={{paddingLeft: Platform.SizeScale(10)}}>
          <View style={{flexDirection: 'column'}}>
            {renderItems(0)}
            {renderItems(1)}
          </View>
        </ScrollView>
        <Text
          style={{
            color: theme.colors.TEXT_BLACK,
            margin: Platform.SizeScale(10),
            marginTop: Platform.SizeScale(20),
            fontWeight: 'bold',
          }}
          color="black"
          fontSize={theme.typography.fontSize.s}>
          Chọn bữa ăn:
        </Text>
        <ScrollView
          style={{
            flexDirection: 'row',
            marginLeft: Platform.SizeScale(10),
            maxHeight: Platform.SizeScale(40),
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {meals &&
            meals.map((meal, index) => (
              <Touchable onPress={() => selectHandle(meal)} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 1,
                    paddingHorizontal: 3,
                    borderRadius: 5,
                    borderWidth: 1,
                    margin: 3,
                    backgroundColor:
                      selectFood.type === meal.type
                        ? theme.colors.ORANGE
                        : 'white',
                  }}>
                  {selectFood.type !== meal.type ? (
                    <Icon icon={meal.icon} size={2} />
                  ) : (
                    <Icon icon={Icons.ORANGECHECK} size={2} />
                  )}
                  <Text
                    selectable={false}
                    style={{color: theme.colors.TEXT_BLACK, marginLeft: 3}}
                    color="black"
                    fontSize={theme.typography.fontSize.s}>
                    {meal.type}
                  </Text>
                </View>
              </Touchable>
            ))}
        </ScrollView>

        <Text
          style={{
            color: theme.colors.TEXT_BLACK,
            margin: Platform.SizeScale(10),
            marginTop: Platform.SizeScale(20),
            fontWeight: 'bold',
          }}
          color="black"
          fontSize={theme.typography.fontSize.s}>
          Chọn Lượng kcal:
        </Text>
        <ScrollView
          style={{
            flexDirection: 'row',
            marginLeft: Platform.SizeScale(10),
            maxHeight: Platform.SizeScale(40),
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {kcalRange &&
            kcalRange.map((range, index) => {
              return (
                <Touchable onPress={() => selectHandle({range})} key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 1,
                      paddingHorizontal: 3,
                      borderRadius: 5,
                      borderWidth: 1,
                      margin: 3,
                      backgroundColor:
                        selectFood.kcalRange === range
                          ? theme.colors.ORANGE
                          : 'white',
                    }}>
                    {selectFood.kcalRange !== range ? (
                      <Icon icon={Icons.KCAL} size={2} />
                    ) : (
                      <Icon icon={Icons.ORANGECHECK} size={2} />
                    )}
                    <Text
                      selectable={false}
                      style={{color: theme.colors.TEXT_BLACK, marginLeft: 3}}
                      color="black"
                      fontSize={theme.typography.fontSize.S}>
                      {range}
                    </Text>
                  </View>
                </Touchable>
              );
            })}
        </ScrollView>

        <Touchable
          onPress={suggestHandle}
          style={[
            {
              alignSelf: 'center',
              margin: 20,
              padding: 8,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: theme.colors.ORANGE,
            },
            theme.shadowCard,
          ]}>
          <Text
            selectable={false}
            fontType={theme.fonts.DMSansRegular}
            color="white"
            fontSize={theme.typography.fontSize.S}>
            Gợi ý
          </Text>
        </Touchable>
        <View pb={Platform.SizeScale(10)}>
          {response &&
            (response?.length > 0 ? (
              <RecipeList
                widthItems={Platform.SizeScale(150)}
                title={'Công thức phù hợp'}
                data={response}
              />
            ) : (
              <View style={{}}>
                <Text
                  selectable={false}
                  style={{color: theme.colors.TEXT_BLACK, alignSelf: 'center'}}
                  fontSize={theme.typography.fontSize.S}>
                  Hiện chưa có công thức nào liên quan đến loại thực phẩm này,
                  xin vui lòng chọn thực phẩm khác!
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <ActivityIndicator animating={loading} size="large" color={'green'} />
    </View>
  );
};

export default RecipeUp;

const styles = StyleSheet.create({});
