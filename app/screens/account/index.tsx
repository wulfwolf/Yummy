import {Alert, StyleSheet} from 'react-native';
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

const Account = () => {
  const theme = useTheme();
  const {user} = useStore(globalState.$store);
  // console.log(user);

  const navigation = useNavigation();
  const handleLogOut = () => {
    Alert.alert('Logout', 'Logout of your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          globalState.action.LogoutAction();
        },
      },
    ]);
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
          flexDirection: 'row',
        }}>
        <Text
          style={{color: theme.colors.TEXT_BLACK, alignSelf: 'center'}}
          mt={Platform.SizeScale(20)}
          mb={Platform.SizeScale(20)}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.XL}>
          Tài khoản
        </Text>
        <Touchable
          onPress={() => navigation.navigate('Setting')}
          style={{
            justifyContent: 'center',
            position: 'absolute',
            marginVertical: Platform.SizeScale(20),
            right: Platform.SizeScale(20),
          }}>
          <Icon icon={Icons.SETTING2} size={theme.typography.iconSize.S} />
        </Touchable>
      </View>
      <View
        style={{
          borderBottomColor: theme.colors.LIGHT_GRAY,
          borderBottomWidth: 0.7,
        }}>
        <Text
          style={{color: theme.colors.TEXT_BLACK}}
          mt={Platform.SizeScale(20)}
          mb={Platform.SizeScale(10)}
          ml={Platform.SizeScale(15)}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.XL}>
          Nguyễn Đức Thịnh
        </Text>
        <Text
          style={{color: theme.colors.TEXT_GRAY}}
          ml={Platform.SizeScale(15)}
          fontType={theme.fonts.DMSansMedium}
          fontSize={theme.typography.fontSize.S}>
          sample@sample.com
        </Text>
        <Text
          style={{color: theme.colors.TEXT_GRAY}}
          ml={Platform.SizeScale(15)}
          mb={Platform.SizeScale(20)}
          fontType={theme.fonts.DMSansMedium}
          fontSize={theme.typography.fontSize.S}>
          Đã tham gia từ tháng 4 Năm 2023
        </Text>
      </View>

      <Touchable
        // onPress={() => navigation.navigate('ChangePassword')}
        style={{marginTop: 50}}>
        <View
          borderRadius={Platform.SizeScale(15)}
          backgroundColor={'#f7f7f7'}
          style={{
            flexDirection: 'row',
            padding: 10,
            marginHorizontal: Platform.SizeScale(15),
          }}>
          <View flex={1}>
            <Text color="black">Chính sách và Điều khoản</Text>
          </View>
          <Icon icon={Icons.DOCUMENT} size={theme.typography.iconSize.S} />
        </View>
      </Touchable>
      <Touchable
        // onPress={() => navigation.navigate('ChangePassword')}
        style={{marginTop: 30}}>
        <View
          borderRadius={Platform.SizeScale(15)}
          backgroundColor={'#f7f7f7'}
          style={{
            flexDirection: 'row',
            padding: 10,
            marginHorizontal: Platform.SizeScale(15),
          }}>
          <View flex={1}>
            <Text color="black">Về chúng tôi</Text>
          </View>
        </View>
      </Touchable>
      <Touchable
        onPress={handleLogOut}
        style={{alignSelf: 'center', marginTop: 50}}>
        <Text color="#FF0800">Đăng xuất</Text>
      </Touchable>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
