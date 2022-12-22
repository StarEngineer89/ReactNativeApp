import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Center, ContainerView } from 'components/base';
import { palette } from 'src/config';

const ProgressComponent = () => {
  return (
    <ContainerView background={false}>
      <Center style={{ flex: 1 }}>
        <ActivityIndicator animating={true} size='large' color={palette.primary} />
      </Center>
    </ContainerView>
  );
};

export default ProgressComponent;
