import React from 'react';
import { EasingCardTransition, VScreenOptions } from 'src/navigations/navHelpers';
import { AUTH } from 'src/constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntermediateChooseInterest, SwitchUserScreen } from 'src/screens';
import { IAuthStackNavigatorParamsList } from '../../navigations/_types'

const MainNavigationSwitchUser = () => {
  const { Navigator, Screen } = createNativeStackNavigator<IAuthStackNavigatorParamsList>();
  return (
    <Navigator
      screenOptions={{
        ...VScreenOptions,
        ...EasingCardTransition,
      }}>
      <Screen name={AUTH.SWITCH_USERS} component={SwitchUserScreen} options={{ headerShown: false }} />
      <Screen name={AUTH.INTEREST} component={IntermediateChooseInterest} />
    </Navigator>
  );
};

export default MainNavigationSwitchUser;
