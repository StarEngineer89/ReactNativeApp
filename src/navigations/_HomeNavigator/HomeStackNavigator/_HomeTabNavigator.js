import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TABS } from 'src/constants/routes';
import { useDeviceInfo } from 'src/hooks';
import { FeedTab, HomeTab } from 'components/svgs';
import { TeacherClassroomScreen, TeacherNewsScreen } from 'src/screens';
import { palette } from 'src/config';
import { isTablet } from 'src/functions';

const TAB_HEIGHT = isTablet() ? 120 : 80;
const ICON_SIZE = 20;
const Bottom = isTablet() ? 35 : 20;

const TabView = ({ children, focused }) => {
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
      }}
    >
      <View
        style={{
          width: '100%',
          height: Platform.isPad ? 4 : 2,
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
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
      initialRouteName={TABS.MAIN}
    >
      <Tab.Screen
        name={TABS.CLASSROOM}
        component={TeacherClassroomScreen}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
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
          tabBarButton: (props) => <TouchableOpacity {...props} />,
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
