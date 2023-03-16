import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './_AuthNavigator';
import HomeNavigator from './_HomeNavigator';
import { navigationRef } from '../refs';
import { useAuth } from 'src/hooks';
import { OnBoardingScreen } from 'src/screens';
import MainNavigationSwitchUser from "src/screens/Auth/MainNavigationSwitchUser";

const AppNavigator = () => {
  const { state } = useAuth();

  return (
    <NavigationContainer ref={navigationRef}>
      {state.isLoggedIn ? state.authType ? <HomeNavigator /> : <MainNavigationSwitchUser /> : state.showOnBoarding ? <OnBoardingScreen /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
