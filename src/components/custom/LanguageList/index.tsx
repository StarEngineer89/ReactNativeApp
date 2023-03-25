// @ts-nocheck
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { fonts, palette } from 'src/config';
import { isTablet } from 'src/functions';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import GridListItem from '../GridListItem';
import { ContainerView, GridList, Button } from 'components/base';
import { Category } from 'src/entities';

const _getHeaderLoader = () => {
  return <ActivityIndicator size="small" color={palette.primary} />;
};

interface Props {
  data: any;
  navigation: any;
  onItemPress: Function;
  dataFlag: String;
}

const LanguageList = ({ data, navigation, onItemPress, dataFlag }: Props) => {
  return (
    <ContainerView>
      <Text style={[styles.textStyle, { alignSelf: 'center', fontSize: isTablet() ? 18 : 14 }]}>
        {dataFlag === 'Language' ? 'Select Language' : dataFlag === 'Dialect' ? 'Select Dialect' : 'Select Accent'}
      </Text>
      {data.length > 0 ? (
        <GridList
          data={data}
          renderDetails={({ item }) => {
            return (
              <GridListItem onPress={() => onItemPress(item)}>
                <VStack style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Spacer />
                  <HStack>
                    <Text numberOfLines={2} style={styles.textStyle}>
                      {dataFlag === 'Language' ? item.language : dataFlag === 'Dialect' ? item.name : item}
                    </Text>
                  </HStack>
                  <Spacer />
                </VStack>
              </GridListItem>
            );
          }}
        />
      ) : (
        <View style={{ justifyContent: 'center', flex: 1, alignSelf: 'center' }}>
          <Text style={[styles.textStyle, { alignSelf: 'center', fontSize: isTablet() ? 20 : 16 }]}>No Result found</Text>
        </View>
      )}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: isTablet() ? 17 : 12,
    fontFamily: fonts.medium,
    color: palette.primary,
    flexWrap: 'wrap',
    // width: '80%',
  },
  dot: {
    width: isTablet() ? 20 : 10,
    height: isTablet() ? 20 : 10,
    borderRadius: isTablet() ? 10 : 5,
    backgroundColor: palette.primary,
  },
});

export default LanguageList;
