import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '../components/common/icon';
import {Text} from '../components/common/text/text.component';
import {Touchable} from '../components/common/touchable/touchable';
import {View} from '../components/common/view/view.component';
import useTheme from '../hooks/useTheme';
import useThemedStyles from '../hooks/useThemeStyles';
import {ThemeT} from '../provider/theme-provider';

import Account from '../screens/account';
import {Icons} from '../utils/icons';
import {Platform} from '../utils/platform';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import Home from '../screens/home';
import Trainning from '../screens/trainning';
import MyFavoriteFood from '../screens/myFavoriteFood';
import Notification from '../screens/notification';
import {useStore} from 'effector-react';
import {globalState} from '../../effector';
// import i18n from '../locale';

const Tab = createBottomTabNavigator();

const tabbars = {
  Home: Icons.RECIPE,
  Trainning: Icons.WEIGHT,
  MyFood: Icons.COOKBOOK,
  Account: Icons.CHEF,
  Notification: Icons.BELL_LINE,
};
const getTabBarBadge = route => {
  // Lấy số lượng thông báo từ route.params hoặc từ state
  // const count = route.params?.notificationCount || 0;
  const count = 1;

  // Nếu số lượng thông báo > 0 thì hiển thị badge, ngược lại thì không hiển thị badge
  if (count > 0) {
    return (
      <View
        style={{
          backgroundColor: 'red',
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>{count}</Text>
      </View>
    );
  } else {
    return null;
  }
};
function MyTabBar({state, descriptors, navigation}) {
  const theme = useTheme();
  const themeStyles = useThemedStyles(styles);
  const {notifications, user} = useStore(globalState.$store);
  const notiDidNotRead = notifications?.filter(
    tmp => !tmp.read.includes(user?._id),
  );

  return (
    <View style={themeStyles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Touchable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              alignItems="center"
              style={{
                flex: 1,
                justifyContent: 'center',
                borderTopWidth: isFocused ? 1 : 0,
                borderTopColor: isFocused ? theme.colors.ACTIVE : null,
              }}>
              {route.name === 'Notification' ? (
                notiDidNotRead?.length == 0 ? null : (
                  <View
                    style={{
                      backgroundColor: theme.colors.ORANGE,
                      width: 15,
                      height: 15,
                      position: 'absolute',
                      top: 5,
                      right: 25,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        textAlign: 'center',
                      }}>
                      {notiDidNotRead?.length}
                    </Text>
                  </View>
                )
              ) : (
                <></>
              )}
              <Icon
                tintColor={
                  isFocused ? theme.colors.ACTIVE : theme.colors.DISABLED
                }
                icon={tabbars[route.name]}
                size={1.5}
              />
              <Text
                color={isFocused ? theme.colors.ACTIVE : theme.colors.DISABLED}
                fontType="RedHatDisplayRegular"
                mv={Platform.SizeScale(0)}>
                {label}
              </Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
}

export const TabBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'red',
        },
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Trang chủ',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Ưa thích',
        }}
        name="MyFood"
        component={MyFavoriteFood}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={({route}) => ({
          tabBarBadge: getTabBarBadge(route),
          tabBarLabel: 'Thông báo',
        })}
      />
      {/* <Tab.Screen name="Trainning" component={Trainning} /> */}
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = (theme: ThemeT) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.WHITE,
      height: Platform.SizeScale(60),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,

      elevation: 7,
    },
  });
