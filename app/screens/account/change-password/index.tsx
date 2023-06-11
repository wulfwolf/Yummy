import {StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import useTheme from '../../../hooks/useTheme';
import {View} from '../../../components/common/view/view.component';
import {Text} from '../../../components/common/text/text.component';
import {Touchable} from '../../../components/common/touchable/touchable';
import {Icon} from '../../../components/common/icon';
import {Icons} from '../../../utils/icons';
import {Platform} from '../../../utils/platform';
import BackButton from '../../../components/back-button';

const ChangePassword = () => {
  const [oldPassToggle, setOldPassToggle] = useState(true);
  const [newPassToggle, setNewPassToggle] = useState(true);
  const theme = useTheme();
  const [pass, setPass] = useState({
    oldPass: '',
    newPass: '',
  });
  const [loading, setLoading] = useState(false);
  const submitHandle = async () => {};
  return (
    <View flex={1} backgroundColor={theme.colors.WHITE} pd={5}>
      <BackButton />
      <View mt={Platform.SizeScale(150)}>
        <Text
          mt={Platform.SizeScale(30)}
          color="black"
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.L}
          style={{fontWeight: 'bold'}}>
          Change Your Password!
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
                value={pass.oldPass}
                placeholder="old password"
                secureTextEntry={oldPassToggle}
                style={{
                  color: theme.colors.TEXT_BLACK,
                  fontSize: theme.typography.fontSize.L,
                }}
                onChangeText={password =>
                  setPass({
                    ...pass,
                    oldPass: password,
                  })
                }
              />
            </View>
            <Touchable onPress={() => setOldPassToggle(!oldPassToggle)}>
              <Icon icon={Icons.EYE} size={theme.typography.iconSize.S} />
            </Touchable>
          </View>
        </View>
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
                value={pass.newPass}
                placeholder="new password"
                secureTextEntry={newPassToggle}
                style={{
                  color: theme.colors.TEXT_BLACK,
                  fontSize: theme.typography.fontSize.L,
                }}
                onChangeText={password =>
                  setPass({
                    ...pass,
                    newPass: password,
                  })
                }
              />
            </View>
            <Touchable onPress={() => setNewPassToggle(!newPassToggle)}>
              <Icon icon={Icons.EYE} size={theme.typography.iconSize.S} />
            </Touchable>
          </View>
        </View>
      </View>
      <Touchable
        onPress={submitHandle}
        style={{
          backgroundColor: theme.colors.LIGHT_BLACK,
          marginTop: Platform.SizeScale(50),
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
          Change
        </Text>
      </Touchable>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
        }}>
        <ActivityIndicator animating={loading} size="large" color={'green'} />
      </View>
    </View>
  );
};

export default ChangePassword;
