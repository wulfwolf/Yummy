import {StyleSheet, Modal, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

import useTheme from '../../hooks/useTheme';

import {View} from '../../components/common/view/view.component';
import {Touchable} from '../../components/common/touchable/touchable';
import {Text} from '../../components/common/text/text.component';
import {Platform} from '../../utils/platform';
import {updateStatus} from './api';

const UpdateModalComponent = ({handleCloseModal, accessToken}: any) => {
  const theme = useTheme();
  const [in4, setIn4] = useState({
    height: '',
    weight: '',
  });
  const updateHandle = async () => {
    if (!in4.height || !in4.weight) {
      alert('vui lòng nhập đủ thông tin cần cập nhật');
    } else {
      const res = await updateStatus({
        heightStatus: in4.height,
        weightStatus: in4.weight,
        accessToken: accessToken,
      });
      if (res === 200) {
        handleCloseModal();
      }
    }
  };
  return (
    <View>
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
              width: '80%',
              height: '80%',
              alignItems: 'center',
            }}>
            {/* Nội dung của popup */}
            <View style={{position: 'absolute', top: 0}}></View>
            <Touchable
              onPress={handleCloseModal}
              style={{alignSelf: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                X
              </Text>
            </Touchable>
            <View style={{alignItems: 'flex-end'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  color={theme.colors.TEXT_GRAY}
                  mt={Platform.SizeScale(20)}
                  fontType={theme.fonts.DMSansRegular}
                  fontSize={theme.typography.fontSize.M}>
                  Chiều cao
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
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  color={theme.colors.TEXT_GRAY}
                  mt={Platform.SizeScale(20)}
                  ml={Platform.SizeScale(20)}
                  fontType={theme.fonts.DMSansRegular}
                  fontSize={theme.typography.fontSize.M}>
                  Cân nặng
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
            </View>
            <Touchable
              onPress={updateHandle}
              style={{
                padding: 8,
                backgroundColor: theme.colors.ORANGE,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                disabled
                style={{color: theme.colors.WHITE}}
                fontType={theme.fonts.DMSansBold}
                fontSize={theme.typography.fontSize.S}>
                Xác nhận
              </Text>
            </Touchable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateModalComponent;

const styles = StyleSheet.create({});
