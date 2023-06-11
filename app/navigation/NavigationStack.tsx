import {DefaultTheme, Theme} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {navigationRef} from './NavigationService';
import {TabBarNavigator} from './BottomTabStack';
import useTheme from '../hooks/useTheme';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import {useStore} from 'effector-react';
import globalState from '../../effector/src/globalState';
import RecipeDetail from '../screens/recipe-detail';
import WholeRecipe from '../screens/whole-recipe';
import Scanner from '../screens/scanner';
import Fridge from '../screens/fridge';
import {Text} from '../components/common/text/text.component';
import AddFood from '../screens/add-food';
import HealthCare from '../screens/healthcare';
import RecipeUp from '../screens/recipe-up';
import Schedule from '../screens/schedule';
import ChangePassword from '../screens/account/change-password';
import NotiModal from '../screens/notification-modal';
import Setting from '../screens/account/setting';

const Stack = createStackNavigator();
const LoggedInStack = createStackNavigator();
const AuthStack = createStackNavigator();

const homeOptions: StackNavigationOptions = {
  headerShown: false,
};

type IProps = {
  theme: Theme;
};
const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} options={homeOptions} />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={homeOptions}
    />
  </AuthStack.Navigator>
);
const LoggedInNavigator = () => (
  <LoggedInStack.Navigator>
    <LoggedInStack.Screen
      name="TabBarNavigator"
      component={TabBarNavigator}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="WholeRecipe"
      component={WholeRecipe}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="Scanner"
      component={Scanner}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="RecipeUp"
      component={RecipeUp}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={homeOptions}
    />
    <LoggedInStack.Screen
      name="Setting"
      component={Setting}
      options={homeOptions}
    />
  </LoggedInStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const {isLoggedIn} = useStore(globalState.$store);
  const themeStyle = useTheme();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeStyle.colors.TRANSPARENT,
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          {isLoggedIn ? (
            <Stack.Screen
              name="LoggedIn"
              component={LoggedInNavigator}
              options={homeOptions}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={homeOptions}
            />
          )}
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Fridge"
            component={Fridge}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen
            name="AddFood"
            component={AddFood}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen
            name="HealthCare"
            component={HealthCare}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen
            name="NotiModal"
            component={NotiModal}
            options={{
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
