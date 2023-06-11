import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {Platform} from '../../utils/platform';
import useTheme from '../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {View} from '../../components/common/view/view.component';
import BackButton from '../../components/back-button';
import {Text} from '../../components/common/text/text.component';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import {getNotificationsAPI} from '../home/api';
import {readNotificationAPI} from './api';
const NotiModal = ({route}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {accessToken} = useStore(globalState.$store);
  const noti = route.params;
  const readNotiHandle = async () => {
    if (
      (await readNotificationAPI({
        notiID: noti._id,
        accessToken: accessToken,
      })) === 1
    ) {
      await getNotificationsAPI({accessToken});
    }
  };
  useEffect(() => {
    readNotiHandle();
  }, []);

  return (
    <View flex={1} backgroundColor={theme.colors.WHITE}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Platform.SizeScale(70),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: 'white',
        }}>
        <BackButton />
        <Text
          color="black"
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.M}>
          {noti.title}
        </Text>
      </View>
      <View pd={10} style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          color="black"
          fontType={theme.fonts.DMSansRegular}
          fontSize={theme.typography.fontSize.S}
          style={{
            textAlign: 'justify',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {noti.content}
        </Text>
      </View>
    </View>
  );
};

export default NotiModal;
