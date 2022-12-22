import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EasingCardTransition,
  VScreenOptions,
} from "src/navigations/navHelpers";
import { SETS } from "src/constants/routes";
import {
  SetsManageScreen,
  SetDetailsScreen,
  SetItemEditScreen,
  CustomSetsManageScreen,
  CustomSetEditScreen,
} from "src/screens";

const SetsStackNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ ...VScreenOptions }}>
      <Stack.Screen name={SETS.MANAGE} component={SetsManageScreen} />
      <Stack.Screen
        name={SETS.MANAGE_CUSTOMS}
        component={CustomSetsManageScreen}
      />
      <Stack.Screen name={SETS.EDIT} component={CustomSetEditScreen} />
      <Stack.Screen
        name={SETS.EDIT_DETAILS}
        component={SetItemEditScreen}
        options={({ route }) => ({
          title: "Edit",
          gestureEnabled: false,
          // ...EasingCardTransition,
          presentation: "card",
          header: () => null,
          // headerTransparent: true,
        })}
      />

      <Stack.Screen
        name={SETS.DETAILS}
        component={SetDetailsScreen}
        options={({ route }) => ({
          title: route.params?.title,
          gestureEnabled: false,

          // headerRight: () => null,
          // headerLeft: () => null,
        })}
      />
    </Stack.Navigator>
  );
};

export default SetsStackNavigator;
