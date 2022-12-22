import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeaderRight, VScreenOptions } from 'src/navigations/navHelpers';
import { ChangePasswordScreen, ProfileScreen } from 'src/screens';

const ProfileNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={VScreenOptions}>
      <Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={() => ({ headerRight: () => <HomeHeaderRight />, headerLeft: () => null })}
      />
      <Screen name={'Change Password'} component={ChangePasswordScreen} />
    </Navigator>
  );
};

export default ProfileNavigator;
