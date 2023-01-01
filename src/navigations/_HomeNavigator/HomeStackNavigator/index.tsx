import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabNavigator from './_HomeTabNavigator';
import StudentsStackNavigator from './_StudentsStackNavigator';
import SetsStackNavigator from './_SetsStackNavigator';
import { STUDENTS, SETS, TEACHER } from 'src/constants/routes';
import { IHomeStackNavigatorParamsList } from 'src/navigations/_types';

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator<IHomeStackNavigatorParamsList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={TEACHER.MAIN} component={HomeTabNavigator} options={{ gestureEnabled: false }} />
      <Stack.Screen name={STUDENTS.MAIN} component={StudentsStackNavigator} />
      <Stack.Screen name={SETS.MAIN} component={SetsStackNavigator} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
