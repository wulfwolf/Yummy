import React, {useCallback, useEffect, useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/back-button';
import {Calendar} from 'react-native-calendars';
import {Platform} from '../../utils/platform';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {meals} from '../recipe-up/__mocks__/data';
import {Touchable} from '../../components/common/touchable/touchable';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import commonStyles from '../../utils/commonStyles.utils';
import {createScheduleAPI} from './api';

const Schedule = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectDate, setSelectDate] = useState({
    date: '',
    Schedule: false,
  });
  const [selectMeal, setSelectMeal] = useState();
  const [selectRecipe, setSelectRecipe] = useState('');
  const [text, setText] = useState('');
  const {recipes, accessToken, schedulesList} = useStore(globalState.$store);
  const [hide, setHide] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [markedDates, setMarkedDates] = useState();
  const [loading, setLoading] = useState(false);

  const selectMealHandle = meal => {
    setSelectMeal(meal.type);
  };
  const selectRecipeHandle = item => {
    setSelectRecipe(item);
  };
  const handleSearch = () => {
    if (text === '') {
      setSearchResult([]);
    } else {
      const tmp = [];
      recipes.map(recipe => {
        if (recipe.recipeName.toLowerCase().includes(text.toLowerCase())) {
          tmp.push(recipe);
        }
      });
      setSearchResult(tmp);
    }
  };
  const handleSubmit = async () => {
    if (selectDate.date === '' || selectMeal === '' || selectRecipe === '') {
      alert('vui lòng chọn đầy đủ thông tin!');
    } else {
      await createScheduleAPI({
        accessToken: accessToken,
        recipeID: selectRecipe._id,
        date: selectDate.date,
        meal: selectMeal,
      });
      // await globalState.action.scheduleAction([
      //   ...schedulesList,
      //   {
      //     ...selectDate,
      //     recipe: selectRecipe,
      //     meal: selectMeal,
      //     Scheduled: true,
      //   },
      // ]);
      navigation.navigate('Home');
    }
  };

  const selectDateHandle = day => {
    const selectDay = {date: day.dateString, Scheduled: false};
    setSelectDate(selectDay);

    const tmp = [...schedulesList, selectDay].reduce((obj, tmp) => {
      if (tmp.Scheduled) {
        obj[tmp.date] = {marked: true};
        return obj;
      } else {
        obj[tmp.date] = {selected: true};
        return obj;
      }
    }, {});
    setMarkedDates(tmp);
  };

  useEffect(() => {
    const tmp = schedulesList?.reduce((obj, tmp) => {
      if (tmp.Scheduled) {
        obj[tmp.date] = {marked: true};
        return obj;
      } else {
        obj[tmp.date] = {selected: true};
        return obj;
      }
    }, {});
    setMarkedDates(tmp);
  }, [schedulesList]);

  const renderItems = useCallback(
    ({item}: any) => {
      console.log(item);

      return (
        <View width={Platform.SizeScale(170)}>
          <Touchable onPress={() => selectRecipeHandle(item)}>
            <View key={item.id} mg={Platform.SizeScale(10)} mb={0}>
              <Image
                source={{uri: item.img}}
                style={{
                  width: Platform.SizeScale(150),
                  height: Platform.SizeScale(100),
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
                top={Platform.SizeScale(10)}></View>
              <Text
                numberOfLines={1}
                color="black"
                fontType={theme.fonts.default}
                fontSize={theme.typography.fontSize.S}
                style={{fontWeight: 'bold', alignSelf: 'center'}}>
                {item.recipeName}
              </Text>
            </View>
          </Touchable>
          {selectRecipe.recipeName === item.recipeName && (
            <Icon
              icon={Icons.TICK_DONE}
              size={2}
              style={{
                position: 'absolute',
              }}
            />
          )}
        </View>
      );
    },
    [selectRecipe, theme.fonts.default, theme.typography.fontSize.S],
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View flex={1} backgroundColor={theme.colors.WHITE}>
        <BackButton />
        <View
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
              fontSize={theme.typography.fontSize.XL}
              style={{fontWeight: 'bold', alignSelf: 'center'}}>
              Lên lịch cho món ăn
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: theme.colors.LIGHT_BLACK,
                margin: Platform.SizeScale(10),
                fontWeight: 'bold',
              }}
              color="black"
              fontSize={theme.typography.fontSize.s}>
              Tìm kiếm công thức:
            </Text>
            <TextInput
              style={{
                color: theme.colors.TEXT_BLACK,
                fontSize: theme.typography.fontSize.L,
                backgroundColor: theme.colors.LIGHT_GRAY,
                paddingHorizontal: Platform.SizeScale(20),
                width: Platform.SizeScale(200),
                borderRadius: Platform.SizeScale(8),
              }}
              onChangeText={searchText => setText(searchText)}
              onEndEditing={handleSearch}
              value={text}
            />
          </View>
          <FlatList
            data={searchResult}
            renderItem={renderItems}
            horizontal
            numColumns={1}
          />
          <Touchable
            style={[
              {
                alignSelf: 'center',
                padding: 8,
                borderRadius: 5,
                margin: 10,
                backgroundColor: theme.colors.ORANGE,
              },
              theme.shadowCard,
            ]}
            onPress={() => setHide(!hide)}>
            <Text
              fontType={theme.fonts.DMSansRegular}
              color="white"
              fontSize={theme.typography.fontSize.S}>
              {hide ? 'Chọn ngày' : 'Ẩn'}
            </Text>
          </Touchable>
          {!hide && (
            <ScrollView
              style={{
                flexDirection: 'row',
                marginLeft: Platform.SizeScale(10),
                maxHeight: Platform.SizeScale(40),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {meals &&
                meals.map((meal, index) => (
                  <Touchable onPress={() => selectMealHandle(meal)} key={index}>
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
                          selectMeal === meal.type
                            ? theme.colors.ORANGE
                            : 'white',
                      }}>
                      {selectMeal !== meal.type ? (
                        <Icon icon={meal.icon} size={2} />
                      ) : (
                        <Icon icon={Icons.ORANGECHECK} size={2} />
                      )}
                      <Text
                        selectable={false}
                        style={{color: theme.colors.TEXT_BLACK}}
                        color="black"
                        fontSize={theme.typography.fontSize.S}>
                        {meal.type}
                      </Text>
                    </View>
                  </Touchable>
                ))}
            </ScrollView>
          )}
          {!hide && (
            <Calendar
              onDayPress={day => selectDateHandle(day)}
              markedDates={markedDates}
            />
          )}
        </View>

        <Text
          style={{
            color: theme.colors.LIGHT_BLACK,
            margin: Platform.SizeScale(10),
            fontWeight: 'bold',
          }}
          color="black"
          fontSize={theme.typography.fontSize.S}>
          Tag: {selectRecipe.recipeName}, {selectMeal}, {selectDate.date}
        </Text>
      </View>
      {selectDate.date && selectMeal && selectRecipe.recipeName && (
        <Touchable
          style={{
            alignSelf: 'center',
            padding: 8,
            backgroundColor: theme.colors.ORANGE,
            borderRadius: 5,
            margin: 10,
          }}
          onPress={handleSubmit}>
          <Text
            style={{color: theme.colors.TEXT_BLACK}}
            color="black"
            fontSize={theme.typography.fontSize.S}>
            Xác nhận
          </Text>
        </Touchable>
      )}
      <ActivityIndicator animating={loading} size="large" color={'green'} />
    </ScrollView>
  );
};

export default Schedule;
