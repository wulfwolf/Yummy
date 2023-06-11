import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';

export const getScheduleAPI = async (accessToken: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/schedule/`);
    if (res.status === 200) {
      globalState.action.scheduleAction(res.data.schedules);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createScheduleAPI = async ({
  accessToken,
  recipeID,
  date,
  meal,
}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.post(`${API_ENDPOINT}/schedule/${recipeID}`, {
      date: date,
      meal: meal,
    });
    if (res.status === 200) {
      await alert('Lên lịch thành công!');
    }
  } catch (error) {
    console.log(error);
  }
};
