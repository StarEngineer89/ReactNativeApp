import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomInRotate, ZoomOut } from 'react-native-reanimated';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { StyleGuide } from 'src/config';
import { Image, HList } from 'components/base';
import { AddButton } from 'components/custom';
import { ITeacherCategory } from 'src/entities';

interface Props {
  showList: boolean;
  showEdit: boolean;
  onEdit: (e: GestureResponderEvent) => void;
  data: ITeacherCategory[];
  showAdd: boolean;
  onAdd: (e: GestureResponderEvent) => void;
  onPressItem: (item: ITeacherCategory) => void;
}

const CustomSetsList = (props: Props) => {
  return props.showList ? (
    <VStack alignment="leading">
      <HStack alignment="leading" style={{ paddingHorizontal: StyleGuide.sizes.padding }}>
        <Text style={[StyleGuide.typography.dashboardHeader]}>Manage Custom Sets</Text>
        <Spacer />
        {props.showEdit && (
          <TouchableOpacity onPress={props.onEdit}>
            <Text style={[StyleGuide.typography.dashboardHeaderEdit]}>Edit</Text>
          </TouchableOpacity>
        )}
      </HStack>
      <HList
        data={props.data}
        style={{
          backgroundColor: 'transparent',
          marginTop: 1 * StyleGuide.main.spacing,
        }}
        ListHeaderComponent={
          props.showAdd && (
            <Animated.View entering={ZoomIn} exiting={ZoomOut} layout={Layout.delay(200)}>
              <AddButton size="md" onPress={props.onAdd} style={{ marginRight: StyleGuide.main.spacing }} />
            </Animated.View>
          )
        }
        renderItem={({ item, index }) => (
          <Animated.View
            entering={ZoomInRotate.springify().delay(index * 50)}
            layout={Layout.springify()}
            style={props.showAdd ? { marginHorizontal: StyleGuide.main.spacing } : { marginRight: 2 * StyleGuide.main.spacing }}>
            <TouchableOpacity onPress={() => props.onPressItem(item)}>
              <Image uri={item.image} uploading={item.uploading ? item.uploading : undefined} />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </VStack>
  ) : null;
};

export default CustomSetsList;
