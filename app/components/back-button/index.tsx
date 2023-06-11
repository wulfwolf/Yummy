import React from 'react';
import {View} from '../common/view/view.component';
import {Touchable} from '../common/touchable/touchable';
import {Icon} from '../common/icon';
import {Icons} from '../../utils/icons';
import useTheme from '../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {Platform} from '../../utils/platform';

const BackButton = ({mt, color, editHandle, icon}: any) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View
      ph={20}
      mt={Platform.SizeScale(mt ? mt : 25)}
      style={{
        zIndex: 999,
        width: '100%',
      }}
      position="absolute">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Touchable onPress={navigation.goBack}>
          <Icon
            icon={Icons.BACKK}
            size={theme.typography.iconSize.M}
            tintColor={color ? color : 'black'}
          />
        </Touchable>
        {editHandle && (
          <Touchable onPress={editHandle}>
            <Icon
              icon={icon}
              size={theme.typography.iconSize.L}
              tintColor={color ? color : 'black'}
            />
          </Touchable>
        )}
      </View>
    </View>
  );
};

export default BackButton;
