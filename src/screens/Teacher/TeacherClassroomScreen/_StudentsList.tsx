import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  Layout,
  ZoomIn,
  ZoomInRotate,
  ZoomOut,
} from "react-native-reanimated";
import { HStack, Spacer, VStack } from "react-native-stacks";
import { StyleGuide } from "src/config";
import { Tutorials } from "src/constants";
import { Image, HList } from "components/base";
import { AddButton, TutorialBox } from "components/custom";
import { ListProps } from "./_types";

const StudentsList = (props: ListProps) => {
  return (
    <VStack alignment="leading">
      <HStack
        alignment="leading"
        style={{ paddingHorizontal: StyleGuide.sizes.padding }}
      >
        <Text style={[StyleGuide.typography.dashboardHeader]}>
          Manage Students
        </Text>
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
          data={props.data}
          style={{ backgroundColor: "transparent" }}
          snapToInterval={
            3 * (StyleGuide.sizes.thumb.md.width + 2 * StyleGuide.main.spacing)
          }
          ListHeaderComponent={
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              layout={Layout.delay(200)}
            >
              <AddButton
                size="md"
                onPress={props.onAdd}
                style={{ marginRight: StyleGuide.main.spacing }}
              />
            </Animated.View>
          }
          renderItem={({ item, index }) => (
            <Animated.View
              entering={ZoomInRotate.springify().delay(index * 50)}
              layout={Layout.springify()}
              style={{ marginHorizontal: StyleGuide.main.spacing }}
            >
              <TouchableOpacity onPress={() => props.onPressItem(item)}>
                <Image
                  uri={item.image}
                  uploading={item.uploading ? item.uploading : undefined}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      ) : (
        <TutorialBox
          data={Tutorials.students}
          onPress={props.onConfirmTutorial}
        />
      )}
    </VStack>
  );
};

export default StudentsList;
