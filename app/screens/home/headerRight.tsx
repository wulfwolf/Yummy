import React, {useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Touchable} from '../../components/common/touchable/touchable';
import {Platform} from '../../utils/platform';
import {AskCameraPermission} from '../../utils/permission';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';

const HeaderRight = ({animatedHeaderRight}: any) => {
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const fridge = () => {
    navigation.navigate('Fridge');
  };
  const scan = () => {
    navigation.navigate('Scanner');
  };
  const schedule = () => {
    navigation.navigate('Schedule');
  };
  const handleBarCodeScanned = () => {};
  return (
    <Animated.View
      position="absolute"
      zIndex={999}
      style={[{flexDirection: 'row', animatedHeaderRight}]}
      right={20}
      top={30}>
      <Touchable
        onPress={schedule}
        style={{
          marginRight: 20,
          backgroundColor: '#258791',
          borderRadius: Platform.SizeScale(15),
          padding: Platform.SizeScale(5),
        }}>
        <Icon
          icon={Icons.SCHEDULE}
          size={3}
          style={{opacity: 2}}
          tintColor={'white'}
        />
      </Touchable>
      <Touchable
        onPress={fridge}
        style={{
          marginRight: 20,
          backgroundColor: '#258791',
          borderRadius: Platform.SizeScale(15),
          padding: Platform.SizeScale(5),
        }}>
        <Icon
          icon={Icons.FRIDGE}
          size={3}
          style={{opacity: 2}}
          tintColor={'white'}
        />
      </Touchable>
      <Touchable
        onPress={scan}
        style={{
          backgroundColor: '#258791',
          borderRadius: Platform.SizeScale(15),
          padding: Platform.SizeScale(5),
        }}>
        <Icon
          icon={Icons.QR}
          size={3}
          style={{opacity: 2}}
          tintColor={'white'}
        />
      </Touchable>
    </Animated.View>
  );
};

export default HeaderRight;
