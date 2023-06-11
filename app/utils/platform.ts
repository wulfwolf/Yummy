import type {TextStyle} from 'react-native';
import {Dimensions, PixelRatio, Platform as PlatformBase} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {COLORS} from './colors.utils';
import {fontFamily} from './fonts.utils';

const {width, height} = Dimensions.get('window');
aspectRatio = height / width;

class PlBase {
  readonly deviceWidth = width;

  readonly deviceHeight = height;

  readonly platform = PlatformBase.OS;

  readonly borderWidth = 1.5 / PixelRatio.getPixelSizeForLayoutSize(1);

  readonly baseScreenWith = 375;

  readonly baseScreenHeight = 667;

  readonly select = PlatformBase.select;

  readonly OS = PlatformBase.OS;

  readonly SizeScale = (size = 12): number => {
    const scaleWidth = this.deviceWidth / this.baseScreenWith;
    scaleHeight = this.deviceHeight / this.baseScreenHeight;
    scale = Math.min(scaleWidth, scaleHeight);
    return Math.ceil(
      scale *
        (size +
          PlatformBase.select({
            android: 0,
            default: 0,
            ios: 0,
          })),
    );
  };

  readonly headerHeight = this.SizeScale(50);

  readonly version = PlatformBase.Version;

  readonly textBase: TextStyle = {
    color: COLORS.TEXT_BLACK,
    fontFamily: fontFamily.DMSansRegular,
    fontSize: this.SizeScale(14),
  };

  isIpad = () => {
    if (aspectRatio > 1.6) {
      // Code for Iphone
      return false;
    }
    // Code for Ipad
    return true;
  };

  isIphoneX = () => {
    if (isIphoneX()) {
      return true;
    }
  };
}

export const Platform = new PlBase();
