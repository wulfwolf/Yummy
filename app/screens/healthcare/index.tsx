import {Image, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {ProgressBar} from 'react-native-paper';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import {Touchable} from '../../components/common/touchable/touchable';
import {suggest} from './__mocks__/data';
import BackButton from '../../components/back-button';
import BMIchart from './BMIchart';
import {getStatusLog} from './api';
import UpdateModalComponent from './UpdateModal';
const HealthCare = () => {
  const theme = useTheme();
  const {user, accessToken, statusLogs} = useStore(globalState.$store);
  const {weight, height, gender, updatedAt} = user;
  const [visible, setVisible] = useState(false);
  const userBMI = weight / ((height / 100) ^ 2);
  const date = new Date(updatedAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const [healthState, setHealthState] = useState({
    state: '',
    color: '',
    level: 0,
    suggest: '',
    kcal: '',
  });

  const checkBMI = useCallback(() => {
    if (userBMI < 18.5) {
      setHealthState({
        state: 'gầy',
        color: '#ffdd3b',
        level: 0.2,
        suggest: suggest[0].suggestion,
        kcal: suggest[0].kcal,
      });
    } else if (18.5 < userBMI && userBMI < 24.9) {
      setHealthState({
        state: 'cân đối',
        color: '#2fa039',
        level: 0.4,
        suggest: suggest[1].suggestion,
        kcal: suggest[1].kcal,
      });
    } else if (25 < userBMI && userBMI < 29.9) {
      setHealthState({
        state: 'thừa cân',
        color: '#ffd292',
        level: 0.6,
        suggest: suggest[2].suggestion,
        kcal: suggest[2].kcal,
      });
    } else if (30 < userBMI && userBMI < 34.9) {
      setHealthState({
        state: 'béo phì',
        color: '#ff9292',
        level: 0.8,
        suggest: suggest[3].suggestion,
        kcal: suggest[3].kcal,
      });
    } else {
      setHealthState({
        state: 'béo phì nguy hiểm',
        color: '#ff92e9',
        level: 1,
        suggest: suggest[4].suggestion,
        kcal: suggest[4].kcal,
      });
    }
  }, [userBMI]);

  useEffect(() => {
    const delay = setTimeout(() => {
      getStatusLog(accessToken);
    }, 1000);

    checkBMI();
    return () => clearTimeout(delay);
  }, [accessToken, checkBMI]);

  return (
    <View flex={1} backgroundColor={theme.colors.LIGHT_GRAY}>
      <BackButton />
      {visible ? (
        <UpdateModalComponent
          handleCloseModal={() => setVisible(false)}
          accessToken={accessToken}
        />
      ) : (
        <></>
      )}
      <View
        pd={Platform.SizeScale(20)}
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
          Kiểm tra tình trạng
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50, paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <View
          mt={10}
          style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <View style={{alignItems: 'center'}}>
                <Text
                  fontType={theme.fonts.DMSansMedium}
                  style={{color: theme.colors.TEXT_GRAY}}
                  fontSize={theme.typography.fontSize.S}>
                  Chiều cao
                </Text>
                <Text
                  fontType={theme.fonts.DMSansBold}
                  style={{
                    color: '#f42c7a',
                  }}>{` ${height}`}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  fontType={theme.fonts.DMSansMedium}
                  style={{color: theme.colors.TEXT_GRAY}}
                  fontSize={theme.typography.fontSize.S}>
                  Cân nặng
                </Text>
                <Text
                  fontType={theme.fonts.DMSansBold}
                  style={{
                    color: '#f42c7a',
                  }}>{` ${weight}`}</Text>
              </View>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <Text
                  fontType={theme.fonts.DMSansMedium}
                  style={{color: theme.colors.TEXT_GRAY}}
                  fontSize={theme.typography.fontSize.S}>
                  Lần cuối cập nhật vào
                </Text>
                <Text
                  fontType={theme.fonts.DMSansBold}
                  style={{
                    color: '#f42c7a',
                  }}>
                  {formattedDate}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  fontType={theme.fonts.DMSansMedium}
                  style={{color: theme.colors.TEXT_GRAY}}
                  fontSize={theme.typography.fontSize.S}>
                  giới tính
                </Text>
                <Text
                  fontType={theme.fonts.DMSansBold}
                  style={{
                    color: '#f42c7a',
                  }}>{` ${gender === 'Male' ? 'Nam' : 'Nữ'}`}</Text>
              </View>
            </View>
          </View>
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <Text
              fontType={theme.fonts.DMSansMedium}
              style={{color: theme.colors.TEXT_GRAY}}>
              BMI
            </Text>
            <Text
              fontType={theme.fonts.DMSansBold}
              style={{
                color: '#f42c7a',
              }}>
              {` ${userBMI.toFixed(2)}`}
            </Text>
          </View>
        </View>

        {healthState.state && (
          <View mt={10}>
            <View
              style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../assets/icons/doctor.png')}
                  style={{
                    height: Platform.SizeScale(180),
                    width:
                      Platform.deviceWidth - (Platform.deviceWidth * 65) / 100,
                    zIndex: 999,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    maxWidth:
                      Platform.deviceWidth - (Platform.deviceWidth * 40) / 100,
                    alignItems: 'center',
                    padding: Platform.SizeScale(10),
                  }}>
                  <Text
                    color={theme.colors.TEXT_GRAY}
                    fontType={theme.fonts.DMSansRegular}
                    fontSize={theme.typography.fontSize.S}>
                    Tình trạng sức khỏe của bạn đang ở mức:
                  </Text>
                  <Text
                    fontType={theme.fonts.DMSansBold}
                    style={{
                      color: healthState.color,
                    }}>{`${healthState.state}`}</Text>
                  <Text
                    mt={5}
                    color={theme.colors.TEXT_GRAY}
                    fontType={theme.fonts.DMSansRegular}
                    fontSize={theme.typography.fontSize.S}>
                    Đừng quên cập nhật trạng thái định kỳ để bạn có thể kiểm
                    soát cơ thể một cách hiệu quả nhất.
                  </Text>
                  <Touchable
                    onPress={() => setVisible(true)}
                    style={[
                      {
                        alignSelf: 'center',
                        padding: 8,
                        backgroundColor: theme.colors.ORANGE,
                        borderRadius: 5,
                        marginVertical: 10,
                      },
                      theme.shadowCard,
                    ]}>
                    <Text
                      fontType={theme.fonts.DMSansBold}
                      style={{color: theme.colors.WHITE}}
                      fontSize={theme.typography.fontSize.S}>
                      Cập nhật ngay
                    </Text>
                  </Touchable>
                </View>
              </View>
              <ProgressBar
                progress={healthState.level}
                style={{
                  height: 10,
                  marginLeft: Platform.SizeScale(15),
                  marginRight: Platform.SizeScale(15),
                  borderRadius: 8,
                }}
                color={healthState.color}
              />
              <Text
                color="black"
                fontType={theme.fonts.DMSansItalic}
                style={{alignSelf: 'center'}}
                fontSize={theme.typography.fontSize.S}>
                Thanh trạng thái
              </Text>
            </View>
            {statusLogs?.length > 0 && (
              <View
                mt={10}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BMIchart />
                <Text
                  mt={3}
                  color="black"
                  fontType={theme.fonts.DMSansItalic}
                  fontSize={theme.typography.fontSize.S}>
                  Biểu đồ BMI
                </Text>
              </View>
            )}

            <View
              mt={10}
              style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
              <Text
                fontSize={theme.typography.fontSize.S}
                color={theme.colors.TEXT_GRAY}>
                Lời khuyên cho bạn:
              </Text>
              <Text
                fontType={theme.fonts.DMSansRegular}
                fontSize={theme.typography.fontSize.S}
                color="black">
                {`* ${healthState.suggest}`}
              </Text>
              <Text
                fontType={theme.fonts.DMSansRegular}
                fontSize={theme.typography.fontSize.S}
                color="black">
                * lượng kcal cần nạp cho một ngày: {`${healthState.kcal}`}kcal
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HealthCare;

const styles = StyleSheet.create({});
