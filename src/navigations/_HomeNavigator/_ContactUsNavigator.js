import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeaderRight, VScreenOptions } from 'src/navigations/navHelpers';
import { ContactUsScreen } from 'src/screens';

const ContactUsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={VScreenOptions}>
      <Stack.Screen
        name={'sss'}
        component={ContactUsScreen}
        options={() => ({ headerRight: () => <HomeHeaderRight />, headerLeft: () => null, title: 'Contact Us' })}
      />
    </Stack.Navigator>
  );
};

export default ContactUsNavigator;
