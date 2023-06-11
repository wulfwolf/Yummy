import {Platform} from '../../utils/platform';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyleProductItem = (width: number | string) => {
  return useMemo(
    () =>
      StyleSheet.create({
        cover: {
          width,
          height: +width / 1.42,
          borderRadius: Platform.SizeScale(20),
          overflow: 'hidden',
        },
      }),
    [width],
  );
};
