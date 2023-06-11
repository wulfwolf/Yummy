import {FlatList, Image, Keyboard, ScrollView, TextInput} from 'react-native';
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
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {
  IngredientT,
  RecipeT,
  storedFoodT,
} from '../../../effector/src/constants/types';
import {getStoredFood} from '../fridge/api';
const AddFood = () => {
  const theme = useTheme();
  const [response, setResponse] = useState<Array>();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [changeInput, setChangeInput] = useState(false);
  const [searchResult, setSearchResult] = useState<Array>([]);
  const [select, setSelect] = useState<storedFoodT>({
    ingredient: {
      foodName: '',
      _id: '',
    },
    quantity: 0,
  });
  const {accessToken, user} = useStore(globalState.$store);

  const AddHandle = async () => {
    Keyboard.dismiss();
    if (select.quantity > 0) {
      setLoading(true);
      try {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        const res = await axios.post(
          `${API_ENDPOINT}/storedfood/${select.ingredient._id}`,
          {
            quantity: parseInt(select.quantity),
          },
        );
        if (res.status === 200) {
          setSelect({...select, quantity: 0});
          alert('Thêm thành công!');
          await getStoredFood(accessToken);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setSelect({...select, quantity: 0});
        console.log(error);
      }
    }
  };
  const searchToggleHandle = () => {
    setChangeInput(!changeInput);
  };
  const submitHandle = async () => {
    const tmp = [];
    response.map(ingredient => {
      if (ingredient.foodName.toLowerCase().includes(text.toLowerCase())) {
        tmp.push(ingredient);
      }
    });
    setSearchResult(tmp);
  };

  const selectHandle = useCallback(
    (item: IngredientT) => {
      setSelect({
        ...select,
        ingredient: {
          foodName: item.foodName,
          _id: item._id,
        },
      });
    },
    [select],
  );
  const getIngredientsAPI = async () => {
    setLoading(true);
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const res = await axios.get(`${API_ENDPOINT}/ingredient/`);
      if (res.status === 200) {
        setLoading(false);
        setResponse(res.data.ingredient);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getIngredientsAPI();
  }, []);
  const renderItems = useCallback(
    ({item}: any) => {
      return (
        <View width={Platform.SizeScale(180)}>
          <Touchable onPress={() => selectHandle(item)}>
            <View key={item.id} mg={Platform.SizeScale(10)}>
              {select.ingredient.foodName === item.foodName ? (
                <Icon
                  icon={Icons.TICK_DONE}
                  size={1.5}
                  style={{position: 'absolute', zIndex: 999}}
                />
              ) : null}
              <Image
                source={{uri: item.img}}
                style={{
                  width: Platform.SizeScale(150),
                  height: Platform.SizeScale(150),
                  alignSelf: 'center',
                  borderRadius: Platform.SizeScale(8),
                  resizeMode: 'cover',
                }}
              />
              <Text
                numberOfLines={1}
                color="black"
                fontType={theme.fonts.default}
                fontSize={theme.typography.fontSize.S}
                style={{alignSelf: 'center'}}>
                {item.foodName}
              </Text>
            </View>
          </Touchable>
        </View>
      );
    },
    [
      select.ingredient.foodName,
      selectHandle,
      theme.fonts.default,
      theme.typography.fontSize.S,
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
                Tất cả các thực phẩm
              </Text>
            ) : (
              <TextInput
                onSubmitEditing={submitHandle}
                onChangeText={text => setText(text)}
                placeholder="Hãy tìm thực phẩm ở đây!"
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
          data={searchResult.length > 0 ? searchResult : response}
          renderItem={renderItems}
          numColumns={2}
          style={{marginBottom: Platform.SizeScale(100)}}
        />
      </View>
      {select.ingredient.foodName !== '' ? (
        <View
          style={{
            height: Platform.SizeScale(80),
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Platform.SizeScale(20),
          }}>
          <TextInput
            placeholder="Nhập số lượng(gr/ml)!"
            placeholderTextColor={'grey'}
            keyboardType="number-pad"
            value={select.quantity}
            style={{
              borderWidth: 0.3,
              borderRadius: 5,
              paddingHorizontal: 10,
              color: 'black',
              marginRight: 20,
            }}
            onChangeText={text => setSelect({...select, quantity: text})}
          />
          <Touchable onPress={AddHandle}>
            <Text
              color="black"
              fontType={theme.fonts.DMSansItalic}
              fontSize={theme.typography.fontSize.L}>
              Thêm
            </Text>
          </Touchable>
        </View>
      ) : (
        <></>
      )}
      {/* <ActivityIndicator
        animating={loading}
        size="large"
        color={'green'}
        style={{position: 'absolute', alignSelf: 'center', bottom: 0}}
      /> */}
    </View>
  );
};

export default AddFood;
