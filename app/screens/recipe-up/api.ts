import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';

export const getRecipeWithOptionsAPI = async ({
  accessToken,
  type,
  foodName,
  kcalRange,
  _id,
}: any) => {
  //viet api tim kiem theo kcal
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.post(`${API_ENDPOINT}/recipe/options/`, {
      meal: type,
      ingredient: _id,
    });
    if (res.status === 200) {
      return res.data.RecipeWithOpts;
    }
  } catch (error) {
    console.log(error);
  }
};
