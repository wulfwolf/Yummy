import React, {useEffect, useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {Touchable} from '../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/back-button';
import FoodItem from './fooditem';
import {foods} from './__mocks__/data';
import {Icons} from '../../utils/icons';
import {Icon} from '../../components/common/icon';
import {deleteStoredFood, getStoredFood, updateStoredFood} from './api';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import {storedFoodT} from '../../../effector/src/constants/types';
import {Alert, ScrollView} from 'react-native';
const Fridge = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [edit, setEdit] = useState({icon: Icons.EDIT_SQUARE});
  const [selectedItem, setSelectedItem] = useState<storedFoodT>();
  const [input, setInput] = useState(0);
  const [index, setIndex] = useState();
  const {accessToken, storedFoods} = useStore(globalState.$store);

  const editHandle = async () => {
    if (edit.icon == Icons.EDIT_SQUARE) {
      setEdit({icon: Icons.CheckMark});
    } else {
      if (!input) {
        setEdit({icon: Icons.EDIT_SQUARE});
        setInput(0);
        setSelectedItem(undefined);
      } else {
        storedFoods[index].quantity = input;
        await updateStoredFood({
          accessToken: accessToken,
          ingredientID: selectedItem?.ingredient._id,
          quantity: parseInt(input),
          updatedStoreFoods: storedFoods,
        });
        alert('Cập nhật thực phẩm thành công!');
        setEdit({icon: Icons.EDIT_SQUARE});
        setInput(0);
        setSelectedItem(undefined);
      }
    }
  };
  const selectItem = (food: storedFoodT, index: any) => {
    if (edit.icon === Icons.CheckMark) {
      setSelectedItem(food);
      setIndex(index);
    }
  };

  const valueHandle = text => {
    setInput(text);
  };
  useEffect(() => {
    getStoredFood(accessToken);
  }, [accessToken]);
  const deleteHandle = async () => {
    await deleteStoredFood({
      accessToken: accessToken,
      ingredientID: selectedItem?.ingredient._id,
    });
  };
  return (
    <View flex={1} backgroundColor={theme.colors.WHITE}>
      <BackButton
        editHandle={editHandle}
        icon={edit.icon}
        mt={Platform.SizeScale(15)}
      />

      <View
        pd={Platform.SizeScale(20)}
        mb={Platform.SizeScale(20)}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1,
          elevation: 2,
          backgroundColor: 'white',
        }}>
        <Text
          color="black"
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}
          style={{alignSelf: 'center'}}>
          Quản lý thực phẩm
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {storedFoods &&
          storedFoods.map((food, index) => {
            let {quantity} = food;
            let isLiquid = false;
            let check = false;
            if (food.ingredient.unit === 'ml') {
              isLiquid = true;
            }
            if (quantity > 999) {
              quantity = (quantity / 1000).toFixed(2);
              check = true;
            }
            return (
              <View
                key={index}
                style={{
                  marginBottom: 5,
                  marginHorizontal: 5,
                  borderRadius: 8,
                }}>
                <Touchable
                  style={{padding: 8}}
                  onPress={() => selectItem(food, index)}>
                  <FoodItem
                    img={food.ingredient.img}
                    foodName={food.ingredient.foodName}
                    quantity={quantity}
                    unitCheck={check}
                    isLiquid={isLiquid}
                  />
                  {food.ingredient.foodName ===
                  selectedItem?.ingredient.foodName ? (
                    <Icon
                      icon={Icons.TICK_DONE}
                      size={1}
                      style={{
                        position: 'absolute',
                        marginLeft: Platform.SizeScale(20),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Touchable>
              </View>
            );
          })}
      </ScrollView>

      {selectedItem ? (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              zIndex: 9999,
            }}>
            <FoodItem
              img={selectedItem?.ingredient.img}
              foodName={selectedItem?.ingredient.foodName}
              gram={selectedItem?.quantity}
              selected={true}
              valueHandle={text => valueHandle(text)}
              value={input}
            />
          </View>
          <Touchable
            onPress={deleteHandle}
            style={[
              {
                height: 50,
                width: 50,
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#2cbed5',
                position: 'absolute',
                right: '10%',
                bottom: '10%',
              },
              theme.shadowCard,
            ]}>
            <Text
              color="white"
              fontType={theme.fonts.DMSansBoldItalic}
              fontSize={theme.typography.fontSize.S}
              style={{alignSelf: 'center'}}>
              Xóa
            </Text>
          </Touchable>
        </>
      ) : (
        <Touchable
          onPress={() => navigation.navigate('AddFood')}
          style={[
            {
              height: 50,
              width: 50,
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: '#ffd330',
              position: 'absolute',
              right: '10%',
              bottom: '10%',
            },
            theme.shadowCard,
          ]}>
          <Text
            color="white"
            fontType={theme.fonts.DMSansBoldItalic}
            fontSize={theme.typography.fontSize.S}
            style={{alignSelf: 'center'}}>
            Thêm
          </Text>
        </Touchable>
      )}
    </View>
  );
};

export default Fridge;
