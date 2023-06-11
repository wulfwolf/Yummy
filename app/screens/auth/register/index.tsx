import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import useTheme from '../../../hooks/useTheme';
import {View} from '../../../components/common/view/view.component';
import {Text} from '../../../components/common/text/text.component';
import {Platform} from '../../../utils/platform';
import {Touchable} from '../../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../../components/common/icon';
import {Icons} from '../../../utils/icons';
import {RegisterAPI} from './api';
import {RadioButton} from 'react-native-paper';

const Register = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [in4, setIn4] = useState({
    userName: '',
    password: '',
    gender: 'Male',
    height: '',
    weight: '',
  });
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const submitHandle = async () => {
    if (!in4.userName || !in4.password || !in4.height || !in4.weight) {
      alert('please fill the input! ');
    } else {
      setLoading(true);
      await RegisterAPI({
        userName: in4.userName,
        password: in4.password,
        gender: in4.gender,
        height: parseInt(in4.height),
        weight: parseInt(in4.weight),
      });
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      // keyboardVerticalOffset={useHeaderHeight() + 47}
      keyboardVerticalOffset={-500}
      behavior="padding"
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View flex={1} backgroundColor={theme.colors.WHITE} pd={10}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/rxo11bo1l5rpdzwqoou5',
            }}
            style={{
              width: Platform.SizeScale(80),
              height: Platform.SizeScale(80),
              alignSelf: 'center',
              resizeMode: 'contain',
              marginTop: Platform.SizeScale(60),
            }}
          />
          <Text
            color={theme.colors.TEXT_GRAY}
            mt={Platform.SizeScale(20)}
            fontType={theme.fonts.DMSansBold}
            fontSize={theme.typography.fontSize.L}
            style={{fontWeight: 'bold'}}>
            Tên tài khoản
          </Text>
          <TextInput
            placeholder=""
            onChangeText={userName =>
              setIn4({
                ...in4,
                userName: userName,
              })
            }
            style={{
              color: theme.colors.TEXT_BLACK,
              borderRadius: Platform.SizeScale(10),
              backgroundColor: theme.colors.WHITE,
              marginTop: Platform.SizeScale(10),
              borderWidth: 1,
              fontSize: theme.typography.fontSize.L,
            }}
          />
          <Text
            color={theme.colors.TEXT_GRAY}
            mt={Platform.SizeScale(20)}
            fontType={theme.fonts.DMSansBold}
            fontSize={theme.typography.fontSize.L}>
            Mật khẩu
          </Text>
          <View
            style={{
              borderRadius: Platform.SizeScale(10),
              backgroundColor: theme.colors.WHITE,
              marginTop: Platform.SizeScale(10),
              borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Platform.SizeScale(10),
              }}>
              <View style={{flex: 1}}>
                <TextInput
                  value={in4.password}
                  placeholder=""
                  secureTextEntry={toggle}
                  onChangeText={pass =>
                    setIn4({
                      ...in4,
                      password: pass,
                    })
                  }
                  style={{
                    color: theme.colors.TEXT_BLACK,
                    fontSize: theme.typography.fontSize.L,
                  }}
                />
              </View>
              <Touchable onPress={() => setToggle(!toggle)}>
                <Icon icon={Icons.EYE} size={theme.typography.iconSize.S} />
              </Touchable>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              color={theme.colors.TEXT_GRAY}
              mt={Platform.SizeScale(20)}
              fontType={theme.fonts.DMSansBold}
              fontSize={theme.typography.fontSize.M}>
              Chiều cao(cm)
            </Text>
            <View
              style={{
                borderRadius: Platform.SizeScale(10),
                backgroundColor: theme.colors.WHITE,
                marginTop: Platform.SizeScale(10),
                borderWidth: 1,
                marginHorizontal: Platform.SizeScale(10),
                width: 50,
              }}>
              <TextInput
                keyboardType="number-pad"
                maxLength={3}
                value={in4.height}
                placeholder=""
                onChangeText={height =>
                  setIn4({
                    ...in4,
                    height: height,
                  })
                }
                style={{
                  color: theme.colors.TEXT_BLACK,
                  fontSize: theme.typography.fontSize.L,
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text
              color={theme.colors.TEXT_GRAY}
              mt={Platform.SizeScale(20)}
              ml={Platform.SizeScale(20)}
              fontType={theme.fonts.DMSansBold}
              fontSize={theme.typography.fontSize.M}>
              Cân nặng(kg)
            </Text>
            <View
              style={{
                borderRadius: Platform.SizeScale(10),
                backgroundColor: theme.colors.WHITE,
                marginTop: Platform.SizeScale(10),
                borderWidth: 1,
                marginHorizontal: Platform.SizeScale(10),
                width: 50,
              }}>
              <TextInput
                keyboardType="number-pad"
                maxLength={3}
                value={in4.weight}
                placeholder=""
                onChangeText={weight =>
                  setIn4({
                    ...in4,
                    weight: weight,
                  })
                }
                style={{
                  color: theme.colors.TEXT_BLACK,
                  fontSize: theme.typography.fontSize.L,
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={gender =>
                setIn4({
                  ...in4,
                  gender: gender,
                })
              }
              value={in4.gender}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Nam" value="Male" />
                <RadioButton.Item label="Nữ" value="Female" />
              </View>
            </RadioButton.Group>
          </View>
          <Touchable
            onPress={submitHandle}
            style={{
              backgroundColor: theme.colors.PRIMARY,
              marginTop: Platform.SizeScale(50),
              alignSelf: 'center',
              borderRadius: Platform.SizeScale(10),
            }}>
            <Text
              fontType={theme.fonts.DMSansBold}
              fontSize={theme.typography.fontSize.L}
              style={{
                alignSelf: 'center',
                padding: Platform.SizeScale(15),
                paddingHorizontal: Platform.SizeScale(60),
                justifyContent: 'center',
                color: 'white',
              }}>
              Đăng ký
            </Text>
          </Touchable>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text
              color={theme.colors.TEXT_GRAY}
              mt={Platform.SizeScale(30)}
              fontType={theme.fonts.DMSansRegular}
              fontSize={theme.typography.fontSize.L}>
              Đã có tài khoản
            </Text>
            <Touchable onPress={() => navigation.navigate('Login')}>
              <Text
                mt={Platform.SizeScale(30)}
                color={theme.colors.ACTIVE}
                fontType={theme.fonts.DMSansItalic}
                fontSize={theme.typography.fontSize.L}>
                {` Đăng nhập`}
              </Text>
            </Touchable>
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
            }}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={'green'}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
            }}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={'green'}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
