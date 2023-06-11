import axios from 'axios';
import {API_ENDPOINT} from '../../constants';
import {globalState} from '../../../effector';
import {StatusLogT} from '../../../effector/src/constants/types';

export const getStatusLog = async accessToken => {
  const dataLogs: StatusLogT[] = [];
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/statuslog/`);
    if (res.status === 200) {
      res.data.statuslog.map(log => {
        const {weight, height, createdAt} = log;
        const date = new Date(createdAt);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const userBMI = weight / ((height / 100) ^ 2);
        dataLogs.push({
          userBMI,
          createdAt: formattedDate,
        });
      });
      globalState.action.statusLogAction(dataLogs);
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateStatus = async ({
  accessToken,
  weightStatus,
  heightStatus,
}: any) => {
  try {
    const dataLogs: StatusLogT[] = [];
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.put(`${API_ENDPOINT}/auth/update/`, {
      weight: weightStatus,
      height: heightStatus,
    });
    if (res.status === 200) {
      res.data.newStatusLog.map(log => {
        const {weight, height, createdAt} = log;
        const date = new Date(createdAt);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const userBMI = weight / ((height / 100) ^ 2);
        dataLogs.push({
          userBMI,
          createdAt: formattedDate,
        });
      });
      globalState.action.statusLogAction(dataLogs);
      globalState.action.LoginAction({user: res.data.newUser, accessToken});
      return res.status;
    }
  } catch (error) {
    console.log('aaaaaaa', error);
  }
};
