import axios from 'axios';
import {API_ENDPOINT} from '../../../constants';
import {globalState} from '../../../../effector';
export const RegisterAPI = async ({
  userName,
  password,
  gender,
  height,
  weight,
}: any) => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/register`, {
      userName: userName,
      password: password,
      gender: gender,
      height: height,
      weight: weight,
    });
    if (res.status === 200) {
      globalState.action.LoginAction(res.data);
    }
  } catch (error) {
    alert('Tài khoản đã tồn tại!');
  }
};
