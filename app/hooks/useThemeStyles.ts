import {ThemeT} from '../../app/provider/theme-provider';
import useTheme from './useTheme';

const useThemedStyles = (styles: (t: ThemeT) => void): any => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
