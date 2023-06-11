import React, {useState} from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import {Touchable} from '../../components/common/touchable/touchable';
import {Platform} from '../../utils/platform';
import {useNavigation} from '@react-navigation/native';

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View
      position="absolute"
      zIndex={999}
      style={[{flexDirection: 'row'}]}
      left={20}
      top={30}>
      <Touchable
        onPress={() => navigation.navigate('HealthCare')}
        style={{
          backgroundColor: '#258791',
          borderRadius: Platform.SizeScale(15),
          padding: Platform.SizeScale(5),
        }}>
        <Icon
          icon={Icons.HEALTHCARE}
          size={3}
          style={{opacity: 2}}
          tintColor={'white'}
        />
      </Touchable>
    </View>
  );
};

export default HeaderLeft;
