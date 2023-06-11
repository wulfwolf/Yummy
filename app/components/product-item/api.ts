import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';
import {RecipeT} from '../../../effector/src/constants/types';
type Props = {
  item: RecipeT;
  accessToken: any;
  foodArray: any;
};
export const addMyFoodAPI = async ({accessToken, item, foodArray}: Props) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.post(`${API_ENDPOINT}/myfood/${item._id}`);
    if (res.data.message === 'Added') {
      globalState.action.myFoodAction([...foodArray, item]);
    } else {
      const tmp = foodArray.filter(a => a._id !== item._id);
      globalState.action.myFoodAction(tmp);
    }
  } catch (error) {
    console.log(error);
  }
};
