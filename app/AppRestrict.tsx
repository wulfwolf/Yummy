import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppRestrict = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <Text style={{color: 'black', fontSize: 30}}>
        It look like your android has been jailbroken
      </Text>
      <Text style={{color: '#606060', fontSize: 22, marginTop: 20}}>
        Because we're serius about keeping your data secure. Yummy app isn't
        supported on jailbroken devices.
      </Text>
      <Text style={{color: 'black', fontSize: 20, marginTop: 15}}>
        if you'd like to use the app. you'll need to restore your factory
        settings.
      </Text>
    </View>
  );
};

export default AppRestrict;

const styles = StyleSheet.create({});
