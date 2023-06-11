/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React, {useEffect, useState} from 'react';
import Navigator from './navigation';
import ThemeProvider from './provider/theme-provider';
import {Provider as PaperProvider} from 'react-native-paper';
import dynamiclinks from '@react-native-firebase/dynamic-links';
import {useStore} from 'effector-react';
import {globalState} from '../effector';
import Route from '../app/navigation/NavigationService';
import axios from 'axios';
import {API_ENDPOINT} from './constants';
import OneSignal from 'react-native-onesignal';
import {getNotificationsAPI} from './screens/home/api';
import SplashScreen from 'react-native-splash-screen';
import JailMonkey from 'jail-monkey';
import AppRestrict from './AppRestrict';
const RootNavigation: React.FC = () => {
  const [truth, setTruth] = useState(false);
  useEffect(() => {
    if (JailMonkey.hookDetected()) {
      setTruth(false);
    }
    if (JailMonkey.isJailBroken()) {
      setTruth(false);
    }
  }, []);

  const isDark = false;
  return (
    <PaperProvider>{!truth ? <Navigator /> : <AppRestrict />}</PaperProvider>
  );
};

const EntryPoint: React.FC = () => {
  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    async notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      getNotificationsAPI({accessToken});
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );
  const {user, accessToken} = useStore(globalState.$store);

  const handleDynamicLink = async link => {
    const length = link.url.length;
    const slug = link.url.slice(30, length);
    if (link) {
      try {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        const res = await axios.get(`${API_ENDPOINT}/recipe/${slug}`);
        if (res.status === 200 && user) {
          Route.navigate('RecipeDetail', res.data.recipe);
        }
      } catch (error) {
        alert("link's slug not found");
      }
    }
  };
  useEffect(() => {
    const unsubcribe = dynamiclinks().onLink(handleDynamicLink);
    return () => unsubcribe();
  }, []);

  useEffect(() => {
    dynamiclinks()
      .getInitialLink()
      .then(link => {
        const length = link?.url.length;
        const slug = link?.url.slice(30, length);
        if (link) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          const res = axios.get(`${API_ENDPOINT}/recipe/${slug}`);
          return res;
        }
      })
      .then(res => {
        if (res?.status === 200)
          Route.navigate('RecipeDetail', res.data.recipe);
      })
      .catch(e => {
        alert("link's slug not found or you are out of session");
      });
  }, []);
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
};

export default EntryPoint;
