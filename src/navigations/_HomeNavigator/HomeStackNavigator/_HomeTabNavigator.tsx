import React, { PropsWithChildren } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';
import { TABS } from 'src/constants/routes';
import { useDeviceInfo } from 'src/hooks';
import { FeedTab, HomeTab } from 'components/svgs';
import { TeacherClassroomScreen, TeacherNewsScreen } from 'src/screens';
import { palette } from 'src/config';
import { IHomeTabNavigatorParamsList } from 'src/navigations/_types';
import { isPad } from 'src/functions';

const ICON_SIZE = 20;

interface Props {
  focused: boolean;
}

const TabView = ({ children, focused }: PropsWithChildren<Props>) => {
  const { width } = useDeviceInfo();
  return (
    <View
      style={{
        position: 'relative',
        width: width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: Bottom,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '100%',
          height: isPad() ? 4 : 2,
          backgroundColor: focused ? palette.primary : palette.white,
          position: 'absolute',
          top: 0,
        }}
      />
      {children}
    </View>
  );
};

const HomeTabNavigator = () => {
  const Tab = createBottomTabNavigator<IHomeTabNavigatorParamsList>();

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
      initialRouteName={TABS.CLASSROOM}>
      <Tab.Screen
        name={TABS.CLASSROOM}
        component={TeacherClassroomScreen}
        options={{
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabView focused={focused}>
              <HomeTab width={ICON_SIZE} height={ICON_SIZE} selected={focused} />
            </TabView>
          ),
        }}
      />
      <Tab.Screen
        name={TABS.NOTIFICATION}
        component={TeacherNewsScreen}
        options={{
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabView focused={focused}>
              <FeedTab width={ICON_SIZE} height={ICON_SIZE} selected={focused} />
            </TabView>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
