import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}
function reset(name: string, params?: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}

export default {
  navigate,
  goBack,
  reset,
};
