import {Platform} from './platform';

const fontSize = {
  MS: Platform.SizeScale(10),
  S: Platform.SizeScale(12),
  M: Platform.SizeScale(14),
  L: Platform.SizeScale(16),
  XL: Platform.SizeScale(18),
  XXL: Platform.SizeScale(24),
};

const letterSpacing = {
  S: 2,
  M: 5,
  L: 10,
};

const iconSize = {
  S: 1,
  M: 1.5,
  L: 2,
  XL: 3,
};

export const typography = {fontSize, letterSpacing, iconSize};
