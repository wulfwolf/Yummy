import {StyleSheet} from 'react-native';
import React from 'react';
import {Touchable} from '../../../components/common/touchable/touchable';
import {View} from '../../../components/common/view/view.component';
import {Text} from '../../../components/common/text/text.component';
import {Platform} from '../../../utils/platform';
import useTheme from '../../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../../components/common/icon';
import {Icons} from '../../../utils/icons';
import {TextInput} from 'react-native-gesture-handler';

const Setting = () => {
  const theme = useTheme();
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
          flexDirection: 'row',
        }}>
        <Text
          style={{color: theme.colors.TEXT_BLACK, alignSelf: 'center'}}
          mt={Platform.SizeScale(20)}
          mb={Platform.SizeScale(20)}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}>
          Tài khoản
        </Text>
        <Touchable
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            position: 'absolute',
            marginVertical: Platform.SizeScale(20),
            left: Platform.SizeScale(20),
          }}>
          <Icon icon={Icons.BACKK} size={theme.typography.iconSize.S} />
        </Touchable>
        <Touchable
          style={{
            justifyContent: 'center',
            position: 'absolute',
            marginVertical: Platform.SizeScale(20),
            right: Platform.SizeScale(20),
          }}>
          <Text
            style={{color: theme.colors.ACTIVE, alignSelf: 'center'}}
            fontType={theme.fonts.DMSansBold}
            fontSize={theme.typography.fontSize.L}>
            HOÀN TẤT
          </Text>
        </Touchable>
      </View>
      <View pd={20}>
        <Text
          style={{color: theme.colors.TEXT_BLACK}}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}>
          Hồ sơ của bạn
        </Text>
        <Text
          mt={30}
          style={{color: theme.colors.TEXT_GRAY}}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.M}>
          Tên
        </Text>
        <TextInput
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            borderColor: '#D9D9D9',
            borderWidth: 0.5,
          }}
        />
        <Text
          mt={15}
          style={{color: theme.colors.TEXT_GRAY}}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.M}>
          Email
        </Text>
        <TextInput
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            borderColor: '#D9D9D9',
            borderWidth: 0.5,
          }}
        />
        <Text
          mt={15}
          style={{color: theme.colors.TEXT_GRAY}}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.M}>
          Số điện thoại
        </Text>
        <TextInput
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            borderColor: '#D9D9D9',
            borderWidth: 0.5,
          }}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
