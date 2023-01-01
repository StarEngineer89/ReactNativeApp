// @ts-nocheck
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { fonts, palette } from 'src/config';
import { isTablet } from 'src/functions';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import GridListItem from '../GridListItem';
import { ContainerView, GridList, Button } from 'components/base';
import { ITeacherCategory } from 'src/entities';

const _getHeaderLoader = () => {
  return <ActivityIndicator size="small" color={palette.primary} />;
};

interface Props {
  data: ITeacherCategory[];
  selected: ITeacherCategory[];
  setSelected: Dispatch<SetStateAction<T[]>>;
  navigateBack: Function;
  navigation: any;
}

const SelectList = ({ data, selected, setSelected, navigateBack, navigation }: Props) => {
  const _renderDoneButton = (count, array) => {
    return (
      <TouchableOpacity title={'Done'} onPress={() => navigateBack(array)}>
        <Text
          onPress={() => {
            navigation.setOptions({
              headerRight: () => _getHeaderLoader(),
            });
            setTimeout(() => navigateBack(array), 500);
          }}
          style={{ color: palette.primary, fontSize: isTablet() ? 18 : 14 }}>
          Done
        </Text>
      </TouchableOpacity>
    );
  };

  const _deselectItem = (item: T) => {
    let count = selected.length - 1;
    let array = selected.filter(sItem => sItem._id !== item._id);
    setSelected(array);

    navigation.setOptions({
      title: `Selected ${count} sets`,
      headerRight: () => _renderDoneButton(count, array),
    });
  };

  const _selectItem = (item: T) => {
    let count = selected.length + 1;
    let array = [...selected, item];
    setSelected(array);

    navigation.setOptions({
      title: `Selected  ${count} sets`,
      headerRight: () => _renderDoneButton(count, array),
    });
  };

  const _selectAll = (all = true) => {
    setSelected(all ? data : []);
    let count = all ? data.length : 0;

    navigation.setOptions({
      title: `Selected ${count} sets`,
      headerRight: () => _renderDoneButton(count, all ? data : []),
    });
  };

  const _checkIfSelected = (item: T) => {
    return selected.filter(sItem => sItem._id === item._id).length > 0;
  };

  return (
    <ContainerView>
      <HStack>
        <Spacer />
        <Button
          variant="filled"
          size="md"
          title={selected.length === 22 ? 'Deselect All' : 'Select All'}
          onPress={() => _selectAll(selected.length === 22 ? false : true)}
        />
        <Spacer />
      </HStack>

      <GridList
        data={data}
        renderDetails={({ item }) => {
          let isSelected = _checkIfSelected(item);
          return (
            <GridListItem
              uri={item.image}
              onPress={() => (isSelected ? _deselectItem(item) : _selectItem(item))}
              style={isSelected && { opacity: 0.7 }}>
              <VStack style={{ flex: 1, paddingHorizontal: 10 }}>
                <Spacer />
                <HStack>
                  <Text numberOfLines={2} style={styles.textStyle}>
                    {item.name}
                  </Text>
                  <Spacer />
                  <View>{isSelected === true && <View style={styles.dot} />}</View>
                </HStack>
                <Spacer />
              </VStack>
            </GridListItem>
          );
        }}
      />
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

export default SelectList;
