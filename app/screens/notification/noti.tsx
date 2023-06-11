import {StyleSheet} from 'react-native';
import React from 'react';
import {View} from '../../components/common/view/view.component';
import {Text} from '../../components/common/text/text.component';
import useTheme from '../../hooks/useTheme';
import {Platform} from '../../utils/platform';
import {Touchable} from '../../components/common/touchable/touchable';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
const Noti = ({Read, readNotiHandle, title, desc, createdAt}) => {
  const theme = useTheme();
  return (
    <Touchable
      onPress={readNotiHandle}
      style={{
        marginTop: 10,
        borderRadius: 3,
        backgroundColor: Read ? '#f2f2f2' : '#D9D9D9',
        padding: 8,
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {Read && (
            <Icon icon={Icons.READED} size={theme.typography.iconSize.S} />
          )}
          <Text
            fontSize={theme.typography.fontSize.M}
            style={{fontWeight: Read ? 'normal' : 'bold'}}
            color={'black'}>
            {title}
          </Text>
        </View>

        <Text fontSize={theme.typography.fontSize.MS} color={'black'}>
          {desc}
        </Text>

        <Text
          fontSize={theme.typography.fontSize.S}
          color={theme.colors.TEXT_GRAY}
          style={{alignSelf: 'flex-end'}}>
          {createdAt}
        </Text>
      </View>
    </Touchable>
  );
};

export default Noti;
