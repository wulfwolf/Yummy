import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';

export const getStoredFood = async accessToken => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/storedfood/`);
    if (res.status === 200) {
      globalState.action.storeAction(res.data.storedFood);
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateStoredFood = async ({
  accessToken,
  ingredientID,
  quantity,
  updatedStoreFoods,
}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.put(`${API_ENDPOINT}/storedfood/${ingredientID}`, {
      quantity: quantity,
    });
    if (res.status === 200) {
      globalState.action.storeAction(updatedStoreFoods);
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteStoredFood = async ({accessToken, ingredientID}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.delete(
      `${API_ENDPOINT}/storedfood/${ingredientID}`,
    );
    if (res.status === 200) {
      globalState.action.storeAction(res.data.newStoredFood);
    }
  } catch (error) {
    console.log(error);
  }
};
