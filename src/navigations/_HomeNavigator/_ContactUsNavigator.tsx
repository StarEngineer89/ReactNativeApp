import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeaderRight, VScreenOptions } from 'src/navigations/navHelpers';
import { ContactUsScreen } from 'src/screens';
import { IContactUsStackNavigatorParamsList } from '../_types';
import { CONTACT_US } from 'src/constants/routes';

const ContactUsNavigator = () => {
  const Stack = createNativeStackNavigator<IContactUsStackNavigatorParamsList>();
  return (
    <Stack.Navigator screenOptions={VScreenOptions}>
      <Stack.Screen
        name={CONTACT_US.MAIN}
        component={ContactUsScreen}
        options={() => ({ headerRight: () => <HomeHeaderRight />, headerLeft: () => null, title: 'Contact Us' })}
      />
    </Stack.Navigator>
  );
};

export default ContactUsNavigator;
