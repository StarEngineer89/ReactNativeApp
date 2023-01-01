import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { STUDENTS } from 'src/constants/routes';
import { EasingCardTransition, VScreenOptions } from 'src/navigations/navHelpers';
import { StudentsManageScreen, StudentClassScreen, StudentEditScreen, StudentSetDetailsScreen, StudentSetsSelectScreen } from 'src/screens';
import { CameraComponent } from 'components/main';
import { IStudentStackNavigatorParamsList } from 'src/navigations/_types';

const StudentsStackNavigator = () => {
  const Stack = createNativeStackNavigator<IStudentStackNavigatorParamsList>();
  return (
    <Stack.Navigator screenOptions={VScreenOptions}>
      <Stack.Screen name={STUDENTS.EDIT} component={StudentEditScreen} />
      <Stack.Screen name={STUDENTS.MANAGE} component={StudentsManageScreen} />
      <Stack.Screen name={STUDENTS.SELECT_SETS} component={StudentSetsSelectScreen} />
      <Stack.Screen name={STUDENTS.CLASS_SETS} component={StudentClassScreen} options={({ route }) => ({ title: route.params?.title })} />
      <Stack.Screen name={STUDENTS.CLASS_SET_ITEMS} component={StudentSetDetailsScreen} options={({ route }) => ({ title: route.params?.title })} />
      <Stack.Screen
        name={STUDENTS.CAMERA}
        component={CameraComponent}
        options={() => ({
          gestureEnabled: false,
          ...EasingCardTransition,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default StudentsStackNavigator;
