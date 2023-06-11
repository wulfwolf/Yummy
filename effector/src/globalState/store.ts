import {createStore} from 'effector';
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
import {persist} from 'effector-storage/rn/async';
import {
  NotificationT,
  RecipeT,
  ScheduleT,
  StatusLogT,
  storedFoodT,
} from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Effector state
export type Store = {
  user: any;
  recipes: Array<RecipeT>;
  isLoggedIn?: boolean;
  myFood: Array<RecipeT>;
  accessToken: any;
  storedFoods: Array<storedFoodT>;
  schedulesList: Array<ScheduleT>;
  notifications?: Array<NotificationT>;
  statusLogs: Array<StatusLogT>;
};

const NAME_STORE = 'Yummy';
const HandlestatusLog = (state: Store, newData: any) => {
  return {
    ...state,
    statusLogs: newData,
  };
};
const handleMyFood = (state: Store, newData: any) => {
  return {
    ...state,
    myFood: newData,
  };
};
const handleUpdateSchedule = (state: Store, newData: any) => {
  return {
    ...state,
    schedulesList: newData,
  };
};
const handleLogin = (state: Store, newData: any) => {
  return {
    ...state,
    user: newData.user,
    isLoggedIn: true,
    accessToken: newData.accessToken,
  };
};
const handleLogout = (state: Store) => {
  AsyncStorage.removeItem(NAME_STORE, () => {
    console.log('user logged out!');
  });
  return {
    ...state,
    user: null,
    isLoggedIn: false,
    accessToken: null,
    myFood: [],
    schedulesList: [],
    storedFoods: [],
    recipes: [],
    statusLogs: [],
  };
};
const handleGetRecipe = (state: Store, newData: any) => {
  return {
    ...state,
    recipes: newData,
  };
};
const handleNotification = (state: Store, newData: any) => {
  return {
    ...state,
    notifications: newData,
  };
};
const handleStore = (state: Store, newData: any) => {
  return {
    ...state,
    storedFoods: newData,
  };
};
// Store reducer
const $store = createStore<Store>(
  {
    user: null,
    recipes: [],
    isLoggedIn: false,
    myFood: [],
    accessToken: '',
    storedFoods: [],
    schedulesList: [],
    notifications: [],
    statusLogs: [],
  },
  {
    name: NAME_STORE,
  },
)
  .on(LoginAction, handleLogin)
  .on(LogoutAction, handleLogout)
  .on(getRecipeAction, handleGetRecipe)
  .on(myFoodAction, handleMyFood)
  .on(storeAction, handleStore)
  .on(scheduleAction, handleUpdateSchedule)
  .on(notificationAction, handleNotification)
  .on(statusLogAction, HandlestatusLog);
persist({store: $store});

export default $store;
