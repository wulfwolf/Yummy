import {
  LoginAction,
  LogoutAction,
  getRecipeAction,
  myFoodAction,
  storeAction,
  scheduleAction,
  notificationAction,
  statusLogAction,
} from './actions';
import $store from './store';

export default {
  $store,
  action: {
    LoginAction,
    LogoutAction,
    getRecipeAction,
    myFoodAction,
    storeAction,
    scheduleAction,
    notificationAction,
    statusLogAction,
  },
};
