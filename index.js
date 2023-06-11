/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/Entrypoint';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';
import OneSignal from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';
import Route from './app/navigation/NavigationService';
import {useStore} from 'effector-react';
import {globalState} from './effector';
import {getNotificationsAPI} from './app/screens/home/api';
// OneSignal Initialization
OneSignal.setAppId('fcbc463d-62da-48e4-b6b1-829b13685585');

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
// OneSignal.setNotificationWillShowInForegroundHandler(
//   async notificationReceivedEvent => {
//     console.log(
//       'OneSignal: notification will show in foreground:',
//       notificationReceivedEvent,
//     );
//     let notification = notificationReceivedEvent.getNotification();
//     console.log('notification: ', notification);
//     const data = notification.additionalData;
//     console.log('additionalData: ', data);
//     // Complete with null means don't show a notification.
//     notificationReceivedEvent.complete(notification);
//   },
// );
//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
  Route.navigate('Home');
});
// Xử lý tác vụ nền
const HeadlessTask = async message => {
  console.log('Headless message received:', message);
  return Promise.resolve();
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  return Promise.resolve();
});
enableScreens();

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask(appName, () => HeadlessTask);
