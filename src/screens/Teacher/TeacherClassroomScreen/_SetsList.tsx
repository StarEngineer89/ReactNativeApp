import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { Layout, ZoomInRotate } from "react-native-reanimated";
import { HStack, Spacer, VStack } from "react-native-stacks";
import { StyleGuide } from "src/config";
import { Tutorials } from "src/constants";
import { Image, HList } from "components/base";
import { TutorialBox } from "components/custom";
import { ListProps } from "./_types";

const arrayToarrays = (array) => {
  let output = [];
  for (let index = 0; index < array.length; index = index + 2) {
    let _internal = [];
    _internal.push({ index });
    if (index + 1 < array.length) _internal.push({ index: index + 1 });

    output.push(_internal);
  }
  return output;
};

const SetsList = (props: ListProps) => {
  return (
    <VStack
      alignment="leading"
      style={{ marginBottom: StyleGuide.sizes.padding }}
    >
      <HStack
        alignment="leading"
        style={{ paddingHorizontal: StyleGuide.sizes.padding }}
      >
        <Text style={[StyleGuide.typography.dashboardHeader]}>Manage Sets</Text>
        <Spacer />
        {props.showEdit && (
          <TouchableOpacity onPress={props.onEdit}>
            <Text style={[StyleGuide.typography.dashboardHeaderEdit]}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </HStack>

      {props.showList ? (
        <HList
          data={arrayToarrays(props.data)}
          style={{
            backgroundColor: "transparent",
            paddingLeft: StyleGuide.sizes.padding - 5,
          }}
          snapToInterval={
            3 * (StyleGuide.sizes.thumb.md.width + 2 * StyleGuide.main.spacing)
          }
          renderItem={({ item, index }) => (
            <VStack spacing={5}>
              {item.map(({ index }) => {
                let _item = props.data[index];
                return (
                  <Animated.View
                    key={index.toString()}
                    entering={ZoomInRotate.springify().delay(index * 20)}
                    layout={Layout.springify()}
                    style={{
                      marginHorizontal: StyleGuide.main.spacing,
                    }}
                  >
                    <TouchableOpacity onPress={() => props.onPressItem(_item)}>
                      <Image uri={_item.image} defaultSource={_item.slug} />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </VStack>
          )}
        />
      ) : (
        <TutorialBox data={Tutorials.sets} onPress={props.onConfirmTutorial} />
      )}
    </VStack>
  );
};

export default SetsList;
