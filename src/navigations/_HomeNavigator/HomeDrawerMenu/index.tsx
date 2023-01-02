import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { Button, Logo } from 'components/base';
import { GearButton, Web, Instagram, Facebook, Youtube } from 'components/svgs';
import { useAuth, useStudent, useTeacher } from 'src/hooks';
import { DRAWER } from 'src/constants/routes';
import { navigationRef } from 'src/refs';
import { palette, StyleGuide } from 'src/config';
import ExpandableList from 'components/custom/ExpandableList';
import { MenuItem } from 'components/custom';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { isPad } from 'src/functions';

let size = StyleGuide.sizes.menuIcons;

interface Props extends DrawerContentComponentProps {
  authType: number;
}

const HomeDrawerMenu = ({ authType, ...props }: Props) => {
  const { signout, switchUser } = useAuth();
  const { state, clearState, setDrawerItem } = useTeacher();
  const { clearStudentState } = useStudent();

  return (
    <SafeAreaView edges={['left', 'right', 'top', 'bottom']} style={[{ flex: 1, backgroundColor: palette.primary }]}>
      <VStack style={[{ flex: 1, backgroundColor: 'transparent' }]} spacing={5}>
        <Logo type="menu" style={{ marginHorizontal: 20 }} />
        <HStack style={{ paddingHorizontal: 20 }}>
          <Text style={[StyleGuide.typography.menuHeader]}>Settings</Text>
          <Spacer />
          <GearButton onPress={() => props.navigation.closeDrawer()} mode="light" />
        </HStack>
        <ScrollView
          style={{ flex: 1, backgroundColor: 'transparent', width: isPad() ? 480 : 230 }}
          // bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <>
            <VStack spacing={2} style={{ backgroundColor: 'transparent', paddingHorizontal: 5 }}>
              {authType === 1 && (
                <MenuItem
                  title="Home"
                  active={state.currentDrawer === 'Home'}
                  onPress={() => {
                    navigationRef.current?.navigate(DRAWER.HOME);
                    setDrawerItem('Home');
                  }}
                  showIndicator
                />
              )}
              {authType === 1 && (
                <MenuItem
                  title="Edit Profile"
                  active={state.currentDrawer === 'Profile'}
                  onPress={() => {
                    navigationRef.current?.navigate(DRAWER.EDIT);
                    setDrawerItem('Profile');
                  }}
                  showIndicator
                />
              )}
              <MenuItem title="Switch User" onPress={switchUser} active={false} />
              <ExpandableList title="About the app">
                <Text style={[StyleGuide.typography.menuSubItem]}>
                  We aim at making language learning a fun experience while preserving the charming characteristics of local dialects. We are here to
                  help you reconnect with your roots and discover new cultures together.
                </Text>
                {authType === 1 && <MenuItem title={'Contact us'} onPress={() => navigationRef.current?.navigate(DRAWER.CONTACT_US)} />}
              </ExpandableList>
              <ExpandableList title="Legal">
                <MenuItem
                  title={'Terms & Conditions'}
                  onPress={() => {
                    Linking.openURL('https://vocaloo.app/?page_id=272');
                  }}
                />
                <MenuItem
                  title={'Privacy Policy'}
                  onPress={() => {
                    Linking.openURL('https://vocaloo.app/?page_id=299');
                  }}
                />
                <MenuItem
                  title="Credits"
                  onPress={() => {
                    Linking.openURL('https://vocaloo.app/?page_id=337');
                  }}
                />
              </ExpandableList>
            </VStack>

            <Spacer />

            <HStack spacing={5} style={{ width: '100%', backgroundColor: 'transparent' }}>
              <Spacer />
              <Text style={[StyleGuide.typography.menuItem, { backgroundColor: 'transparent' }]}>App Version</Text>

              <Text style={[StyleGuide.typography.menuItem, { backgroundColor: 'transparent' }]}>1.0.123</Text>
              <Spacer />
            </HStack>

            {authType === 1 && (
              <VStack spacing={10} style={{ backgroundColor: 'transparent', width: '100%' }}>
                <HStack spacing={8}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://www.instagram.com/vocaloo.app/?hl=en');
                    }}>
                    <Instagram width={size} height={size} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://www.facebook.com/Vocaloo-108153664806335');
                    }}>
                    <Facebook width={size} height={size} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://www.youtube.com/channel/UCxgsVWcaCfVL74y4P6op2SQ');
                    }}>
                    <Youtube width={size} height={size} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://vocaloo.app');
                    }}>
                    <Web width={size} height={size} />
                  </TouchableOpacity>
                </HStack>
                <Button
                  variant="gradient"
                  title="Logout"
                  onPress={() => {
                    clearStudentState();
                    clearState();
                    signout();
                  }}
                />
              </VStack>
            )}
          </>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default HomeDrawerMenu;
