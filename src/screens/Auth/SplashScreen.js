import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from 'components/base';

const SplashScreen = () => (
  <SafeAreaView
    edges={['left', 'top', 'right', 'bottom']}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Logo type='main' size='lg' />
  </SafeAreaView>
);

export default SplashScreen;
