import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';

export const getRecipeAPI = async () => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/recipe/`);
    if (res.status === 200) {
      globalState.action.getRecipeAction(res.data.recipes);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getFavoriteFoodAPI = async ({accessToken, _id}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/myfood/${_id}`);
    if (res.status === 200) {
      globalState.action.myFoodAction(
        res.data.myfoods.map(food => food.recipe),
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const getNotificationsAPI = async ({accessToken}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/notification/`);
    if (res.status === 200) {
      globalState.action.notificationAction(res.data.notis.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};
