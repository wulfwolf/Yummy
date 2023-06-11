import {StyleSheet} from 'react-native';
import React from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import Noti from './noti';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Notification = () => {
  const theme = useTheme();
  const {user, notifications} = useStore(globalState.$store);
  const navigation = useNavigation();
  const readNotiHandle = async ({item, index}: any) => {
    navigation.navigate('NotiModal', item);
  };
  const renderItem = ({item, index}: any) => {
    let tmp = item?.read.includes(user?._id);
    let dateString = item?.createdAt;
    let date = new Date(dateString);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;
    return (
      <View key={index} style={{paddingHorizontal: 5}}>
        <Noti
          Read={tmp}
          readNotiHandle={() => readNotiHandle({item, index})}
          title={item?.title}
          desc={item?.desc}
          createdAt={formattedDate}
        />
      </View>
    );
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
        }}>
        <Text
          style={{color: theme.colors.TEXT_BLACK}}
          mt={Platform.SizeScale(20)}
          mb={Platform.SizeScale(20)}
          ml={Platform.SizeScale(15)}
          color="black"
          fontType={theme.fonts.DMSansBold}
          fontSize={theme.typography.fontSize.XL}>
          Thông báo
        </Text>
      </View>
      <FlatList renderItem={renderItem} data={notifications} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
