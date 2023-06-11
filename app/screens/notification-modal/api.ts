import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';

export const readNotificationAPI = async ({accessToken, notiID}: any) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.put(`${API_ENDPOINT}/notification/${notiID}`);
    if (res.status === 200) {
      return 1;
    }
  } catch (error) {
    console.log(error);
  }
};
