import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VScreenOptions } from 'src/navigations/navHelpers';
import { STUDENT } from 'src/constants/routes';
import { StudentDashboardScreen, StudentClassSetScreen } from 'src/screens';
import { IStudentMainStackNavigatorParamsList } from 'src/navigations/_types';

const StudentNavigator = () => {
  const Stack = createNativeStackNavigator<IStudentMainStackNavigatorParamsList>();
  return (
    <Stack.Navigator screenOptions={VScreenOptions}>
      <Stack.Screen name={STUDENT.DASHBOARD} component={StudentDashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={STUDENT.CLASS_SET}
        component={StudentClassSetScreen}
        options={({ route }) => ({ title: route.params?.title, gestureEnabled: false, headerTransparent: true })}
      />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
