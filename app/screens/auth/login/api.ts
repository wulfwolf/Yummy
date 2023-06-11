import axios from 'axios';
import {API_ENDPOINT} from '../../../constants';
import {globalState} from '../../../../effector';
export const LoginAPI = async ({userName, password}: any) => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/login`, {
      userName: userName,
      password: password,
    });
    if (res.status === 200) {
      globalState.action.LoginAction(res.data);
      console.log(res);
    }
  } catch (error) {
    console.log(error);
    alert('Thông tin đăng nhập chưa chính xác');
  }
};
