import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import useDeviceInfo from '../../../hooks/useDeviceInfo';
import ProgressLineBar from '../ProgressLineBar';
import { palette } from 'src/config';
import { isPad, isTablet } from 'src/functions';

const SPACING = isPad() ? 5 : 2;
const HEIGHT = isPad() ? 22 : 10;

interface Props {
  value: number;
  total: number;
  overall: boolean;
}

const ProgressBarComponent = ({ value, total, overall = false }: Props) => {
  const { width } = useDeviceInfo();
  const WIDTH = isTablet() ? width - 100 : 300;
  const margin = isTablet() ? 10 : 5;
  const percentage = isNaN(value / total) ? 0 : value / total;

  return (
    <VStack spacing={SPACING} style={{ margin, width: WIDTH, marginBottom: 10 }}>
      <HStack>
        <Text style={styles.leftText}>{`${overall ? 'Overall Progress' : 'Progress'}`}</Text>
        <Spacer />
        <Text style={styles.rightText}>{`${value} out of ${total}`}</Text>
      </HStack>
      <ProgressLineBar width={WIDTH} height={HEIGHT} percentage={percentage} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  leftText: {
    fontSize: isPad() ? 21 : 11,
    color: palette.ebony,
  },
  rightText: {
    fontSize: isPad() ? 17 : 8,
    color: palette.ebony,
  },
});

export default ProgressBarComponent;
