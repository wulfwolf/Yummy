import {FontT} from '../../../utils/global';
import type {ParsedTextProps as ParsedTextPropsBase} from 'react-native-parsed-text';

export type ParsedTextProps = ParsedTextPropsBase & {
  activeColor?: string;
  adjustsFontSizeToFit?: boolean;
  children: React.ReactNode | string;
  color?: string;
  fontSize?: number;
  fontType?: keyof FontT | string;
  isLongText?: boolean;
  isPress?: boolean;
  isViewHtml?: boolean;
  maxWidth?: number;
  mb?: number;
  mh?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mv?: number;
  numberOfLines?: number;
  onPress?: () => void;
  showMore?: boolean;
  textAlign?: 'center' | 'justify' | 'left' | 'right';
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase';
};
