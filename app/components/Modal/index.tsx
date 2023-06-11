import {StyleSheet, Modal, Image} from 'react-native';
import React from 'react';
import {Touchable} from '../common/touchable/touchable';
import useTheme from '../../hooks/useTheme';
import {Icons} from '../../utils/icons';
import {Icon} from '../common/icon';
import {View} from '../common/view/view.component';
import {Text} from '../common/text/text.component';
import {checkTags} from '../../utils/function';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';
import {Platform} from '../../utils/platform';

const ModalComponent = ({
  recipe,
  step,
  nextStepHandle,
  handleCloseModal,
  warning,
  success,
}: any) => {
  const theme = useTheme();
  if (!warning) {
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
              <View style={{position: 'absolute', top: 0}}>
                <Svg
                  height={Platform.SizeScale(150)}
                  width={
                    Platform.deviceWidth - (Platform.deviceWidth * 20) / 100
                  }>
                  <Defs>
                    <LinearGradient id="grad" x1="0 " y1="1" x2="0" y2="0">
                      <Stop offset="0" stopColor={'#35a4e8'} stopOpacity="0" />
                      <Stop offset="1" stopColor={'#35a4e8'} stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect width={'100%'} height={'100%'} fill="url(#grad)" />
                </Svg>
              </View>
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

              <Image
                source={
                  success
                    ? require('../../../assets/images/YAY.png')
                    : require('../../../assets/images/COOKCOOK.png')
                }
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />

              <View
                style={{
                  width: '100%',
                }}>
                {success ? (
                  <Text
                    style={{color: '#ffcc35', fontWeight: 'bold'}}
                    mv={15}
                    mt={100}>
                    Quá tuyệt vời, Bạn vừa hoàn thành công thức. Chúc ngon
                    miệng!
                  </Text>
                ) : (
                  <Text
                    style={{color: '#ffcc35'}}
                    fontType={theme.fonts.DMSansBold}
                    mv={15}>
                    {`Bước ${step + 1}`}
                  </Text>
                )}
                {recipe.instruction.map((item, index) => {
                  if (step === index) {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#fbfbfb',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            maxHeight: 130,
                          }}
                          fontType={theme.fonts.DMSansRegular}
                          showMore={true}>
                          {item}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  alignItems: 'center',
                }}>
                {success ? (
                  <></>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    {recipe.instruction.map((dot, index) => (
                      <Icon
                        icon={step === index ? Icons.DOT_CYAN : Icons.DOT_GRAY}
                        size={3}
                        key={index}
                        pd={0}
                      />
                    ))}
                  </View>
                )}

                <Touchable
                  style={{
                    padding: 8,
                    backgroundColor: theme.colors.ORANGE,
                    borderRadius: 5,
                  }}
                  onPress={success ? handleCloseModal : nextStepHandle}>
                  <Text
                    disabled
                    style={{color: theme.colors.WHITE}}
                    fontType={theme.fonts.DMSansBold}
                    fontSize={theme.typography.fontSize.S}>
                    {`${success ? 'Hoàn thành' : 'Tiếp tục'}`}
                  </Text>
                </Touchable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
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
              <View style={{position: 'absolute', top: 0}}>
                <Svg
                  height={Platform.SizeScale(150)}
                  width={
                    Platform.deviceWidth - (Platform.deviceWidth * 20) / 100
                  }>
                  <Defs>
                    <LinearGradient id="grad" x1="0 " y1="1" x2="0" y2="0">
                      <Stop
                        offset="0"
                        stopColor={
                          recipe?.warningTags.includes('HEALTHY FOOD')
                            ? '#3bffb3'
                            : recipe?.warningTags.includes('ALCOHOL')
                            ? '#8624f2'
                            : '#ed8133'
                        }
                        stopOpacity="0"
                      />
                      <Stop
                        offset="1"
                        stopColor={
                          recipe?.warningTags.includes('HEALTHY FOOD')
                            ? '#3bffb3'
                            : recipe?.warningTags.includes('ALCOHOL')
                            ? '#8624f2'
                            : '#ed8133'
                        }
                        stopOpacity="1"
                      />
                    </LinearGradient>
                  </Defs>
                  <Rect width={'100%'} height={'100%'} fill="url(#grad)" />
                </Svg>
              </View>
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
              <Image
                source={
                  recipe?.warningTags.includes('HEALTHY FOOD')
                    ? require('../../../assets/images/FRESH.png')
                    : require('../../../assets/images/WARNING.png')
                }
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />
              <Text
                fontType={theme.fonts.DMSansBoldItalic}
                mv={15}
                color="#ffcc35">
                {`${
                  recipe?.warningTags.includes('HEALTHY FOOD')
                    ? 'Tươi roi rói'
                    : 'ÉT O ÉT'
                }`}
              </Text>

              <View
                style={{
                  flex: 1,
                }}>
                {recipe.warningTags.map((item, index) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: Platform.SizeScale(10),
                      }}
                      mt={10}
                      key={index}>
                      <Icon
                        icon={checkTags(item)?.icon}
                        size={theme.typography.iconSize.M}
                      />
                      <Text fontType={theme.fonts.DMSansRegular} color="black">
                        {`   ${checkTags(item)?.advice}`}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <Touchable
                style={{
                  padding: 8,
                  backgroundColor: theme.colors.ORANGE,
                  borderRadius: 5,
                }}
                onPress={handleCloseModal}>
                <Text
                  disabled
                  style={{color: theme.colors.WHITE}}
                  fontType={theme.fonts.DMSansBold}
                  fontSize={theme.typography.fontSize.S}>
                  Tôi đã hiểu
                </Text>
              </Touchable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

export default ModalComponent;

const styles = StyleSheet.create({});
