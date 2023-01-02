import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './_AuthNavigator';
import HomeNavigator from './_HomeNavigator';
import { navigationRef } from '../refs';
import { useAuth } from 'src/hooks';
import { OnBoardingScreen, SwitchUserScreen } from 'src/screens';

const AppNavigator = () => {
  const { state } = useAuth();
  return (
    <NavigationContainer ref={navigationRef}>
      {state.isLoggedIn ? state.authType ? <HomeNavigator /> : <SwitchUserScreen /> : state.showOnBoarding ? <OnBoardingScreen /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
