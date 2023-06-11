import {TextInput, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTheme from '../../../hooks/useTheme';
import {View} from '../../../components/common/view/view.component';
import {Text} from '../../../components/common/text/text.component';
import {Platform} from '../../../utils/platform';
import {Touchable} from '../../../components/common/touchable/touchable';
import {useNavigation} from '@react-navigation/native';
// import {account} from '../../../../api/api';
// import {answer} from '../../../../effector';
import {Icon} from '../../../components/common/icon';
import {Icons} from '../../../utils/icons';
import {ActivityIndicator} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginAPI} from './api';

const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [in4, setIn4] = useState({
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    // GoogleSignin.configure();
  }, []);
  const signUpHandle = () => {
    setIn4({
      userName: '',
      password: '',
    });
    navigation.navigate('Register', undefined);
  };
  const submitHandle = async () => {
    if (!in4.userName || !in4.password) {
      alert('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu!');
    } else {
      setLoading(true);
      await LoginAPI({userName: in4.userName, password: in4.password});
      setLoading(false);
    }
  };
  const onLoginGoogle = async () => {
    // setLoading(true);
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   if (userInfo) {
    //     const res = await axios.post(
    //       `http://192.168.1.234:5000/api/auth/${userInfo.user.id}`,
    //       {
    //         email: userInfo.user.email,
    //         password: '12345678',
    //         name: userInfo.user.name,
    //       },
    //     );
    //     const createSession = await account.createEmailSession(
    //       userInfo.user.email,
    //       '12345678',
    //     );
    //     if (createSession) {
    //       setLoading(false);
    //       const user = await account.get();
    //       answer.action.LoginAction(user);
    //     }
    //   }
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //     console.log(error.code);
    //     setLoading(false);
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     console.log(error.code);
    //     setLoading(false);
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     console.log(error.code);
    //     setLoading(false);
    //     // play services not available or outdated
    //   } else {
    //     console.log(error);
    //     setLoading(false);
    //     // some other error happened
    //   }
    // }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View flex={1} backgroundColor={theme.colors.WHITE} pd={10}>
        {/* <View
          width={Platform.SizeScale(150)}
          height={Platform.SizeScale(150)}
          backgroundColor={theme.colors.PRIMARY}
          mt={Platform.SizeScale(30)}
          style={{alignSelf: 'center'}}
        /> */}
        <Image
          source={{
            uri: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/rxo11bo1l5rpdzwqoou5',
          }}
          style={{
            width: Platform.SizeScale(200),
            height: Platform.SizeScale(150),
            alignSelf: 'center',
            resizeMode: 'contain',
            marginTop: Platform.SizeScale(30),
          }}
        />
        <Touchable
          onPress={onLoginGoogle}
          style={{
            backgroundColor: theme.colors.LIGHT_BLACK,
            marginTop: Platform.SizeScale(30),
            alignSelf: 'center',
            borderRadius: Platform.SizeScale(10),
          }}>
          <Text
            fontSize={theme.typography.fontSize.L}
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              padding: Platform.SizeScale(15),
              paddingHorizontal: Platform.SizeScale(60),
              justifyContent: 'center',
            }}>
            Đăng nhập với Google
          </Text>
        </Touchable>
        <Text
          color={theme.colors.TEXT_GRAY}
          fontSize={theme.typography.fontSize.S}
          style={{
            alignSelf: 'center',
            padding: Platform.SizeScale(10),
          }}>
          Hoặc
        </Text>
        <Text
          color={theme.colors.TEXT_GRAY}
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}>
          Tên tài khoản
        </Text>
        <TextInput
          value={in4.userName}
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
            fontSize: theme.typography.fontSize.M,
            paddingLeft: 15,
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

        <Touchable
          onPress={submitHandle}
          style={{
            backgroundColor: theme.colors.PRIMARY,
            marginTop: Platform.SizeScale(50),
            alignSelf: 'center',
            borderRadius: Platform.SizeScale(10),
          }}>
          <Text
            fontSize={theme.typography.fontSize.L}
            fontType={theme.fonts.DMSansBold}
            style={{
              alignSelf: 'center',
              padding: Platform.SizeScale(15),
              paddingHorizontal: Platform.SizeScale(60),
              justifyContent: 'center',
              color: 'white',
            }}>
            Đăng nhập
          </Text>
        </Touchable>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text
            color={theme.colors.TEXT_GRAY}
            mt={Platform.SizeScale(30)}
            fontType={theme.fonts.DMSansRegular}
            fontSize={theme.typography.fontSize.L}>
            Chưa có tài khoản?
          </Text>
          <Touchable onPress={signUpHandle}>
            <Text
              mt={Platform.SizeScale(30)}
              color={theme.colors.ACTIVE}
              fontType={theme.fonts.DMSansItalic}
              fontSize={theme.typography.fontSize.L}>
              Đăng ký
            </Text>
          </Touchable>
        </View>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
          }}>
          <ActivityIndicator animating={loading} size="large" color={'green'} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
