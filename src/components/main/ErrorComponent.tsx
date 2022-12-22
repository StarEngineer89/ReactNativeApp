import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { Button, Center } from 'components/base';
import { StyleGuide } from 'src/config';
import { VStack } from 'react-native-stacks';
import { ErrorIcon } from 'components/svgs';
import { useDeviceInfo } from 'src/hooks';

interface ErrorComponentProps {
  error?: string;
  onRetry?: () => void;
  children?: JSX.Element;
}

const ErrorComponent = ({ error, onRetry, children }: ErrorComponentProps) => {
  const { width } = useDeviceInfo();
  return (
    <Center style={{ flex: 1, backgroundColor: 'transparent' }}>
      <VStack spacing={10}>
        <ErrorIcon width={width * 0.5} height={150} />
        <Text style={[StyleGuide.typography.switchError as ViewStyle]}>
          {error || 'Something Went Wrong. Try Again.'}
        </Text>
        <VStack spacing={4}>
          <Button size='md' variant='gradient' title='Retry' onPress={onRetry} />
          {children}
        </VStack>
      </VStack>
    </Center>
  );
};

export default ErrorComponent;
