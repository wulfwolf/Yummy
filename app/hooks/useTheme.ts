import {ThemeContext} from '../provider/theme-provider';
import {useContext} from 'react';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
