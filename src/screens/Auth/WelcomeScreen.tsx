import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, ContainerView, Logo } from 'components/base';
import Center from 'components/base/Center';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer, VStack } from 'react-native-stacks';
import { AUTH } from 'src/constants/routes';
import { IAuthStackNavigatorParamsList } from 'src/navigations/_types';

interface Props extends NativeStackScreenProps<IAuthStackNavigatorParamsList, AUTH.WELCOME> {}

const WelcomeScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ContainerView header={false}>
      <Center style={{ flex: 1, paddingBottom: insets.bottom + 20 }}>
        <VStack spacing={5}>
          <Spacer />
          <Logo type="main" size="lg" />
          <VStack spacing={8}>
            <Button variant="gradient" size="lg" title="Login" onPress={() => navigation.navigate(AUTH.LOGIN)} />
            <Button variant="outline" size="lg" title="Sign Up" onPress={() => navigation.navigate(AUTH.SIGNUP)} />
          </VStack>
          <Spacer />
        </VStack>
      </Center>
    </ContainerView>
  );
};

export default WelcomeScreen;

// <VStack spacing={5}>
//   <Button title='Button' />
//   <Button variant='filled' title='Button' />
//   <Button variant='outline' title='Button' />
//   <Button variant='danger' title='Button' />
//   <Button variant='ghost' title='Button' />
//   <TextInput placeholder='assss' />
// </VStack>;
