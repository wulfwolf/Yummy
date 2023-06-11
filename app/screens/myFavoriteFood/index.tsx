import {Alert, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Touchable} from '../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import FoodCard from './foodCard';
const MyFavoriteFood = () => {
  const theme = useTheme();
  const {myFood} = useStore(globalState.$store);
  const navigation = useNavigation();

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
          fontSize={theme.typography.fontSize.XL}
          style={{fontWeight: 'bold'}}>
          Món ăn của tôi
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myFood &&
          myFood.length > 0 &&
          myFood.map((recipe, index) => (
            <View key={index} ph={20} pv={10}>
              <FoodCard recipeName={recipe?.recipeName} img={recipe?.img} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default MyFavoriteFood;

const styles = StyleSheet.create({});
