import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeaderRight, VScreenOptions } from 'src/navigations/navHelpers';
import { ChangePasswordScreen, ProfileScreen } from 'src/screens';
import { PROFILE } from 'src/constants/routes';
import { IProfileStackNavigatorParamsList } from '../_types';

const ProfileNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator<IProfileStackNavigatorParamsList>();
  return (
    <Navigator screenOptions={VScreenOptions}>
      <Screen name={PROFILE.MAIN} component={ProfileScreen} options={() => ({ headerRight: () => <HomeHeaderRight />, headerLeft: () => null })} />
      <Screen name={PROFILE.MAIN} component={ChangePasswordScreen} />
    </Navigator>
  );
};

export default ProfileNavigator;
