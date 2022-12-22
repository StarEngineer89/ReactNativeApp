import React, { useState, useEffect } from "react";
import { Pressable, View, Text, ScrollView } from "react-native";
import { HStack, Spacer, VStack } from "react-native-stacks";
import { STUDENTS } from "src/constants/routes";
import { ErrorModal, ProcessingModal } from "components/modals";
import { ImageUploader, LabelTextInput } from "components/custom";
import { useDeviceInfo, useTeacher } from "src/hooks";
import { AddButton } from "components/custom";
import { ContainerView, Button, Image } from "components/base";
import { StyleGuide } from "src/config";
import HList from "components/base/HList";
import Animated, { Layout, ZoomInRotate } from "react-native-reanimated";

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

const StudentEditScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { state, clearError, editStudent } = useTeacher();
  const _std = state.students.find((s) => s._id.toString() === id.toString());

  const [student, setStudent] = useState({
    name: _std.name,
    image: _std.image,
    categories: _std.categories,
  });

  const { isTablet, isLandscape } = useDeviceInfo();
  const numRows = isLandscape ? 1 : 2;
  const numColumns = Math.ceil(state.categories.length / numRows);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      if (route.params?.sets)
        setStudent({ ...student, categories: route.params.sets });
    });

    return () => {
      // executed when unmount
      unsubscribeFocus();
    };
  }, [route.params]);

  return (
    <ContainerView>
      {state.savingStudent.loading && <ProcessingModal />}
      {state.savingStudent.error && (
        <ErrorModal
          clearAction={() => clearError("STUDENT")}
          errorText={state.savingStudent.error}
        />
      )}
      <ScrollView>
        <VStack spacing={15}>
          <ImageUploader
            source={student.image}
            onSelectImage={(uri) => setStudent({ ...student, image: uri })}
          />
          <LabelTextInput
            label="Change Student Name"
            value={student.name}
            onChangeText={(value) => setStudent({ ...student, name: value })}
          />
        </VStack>
        <VStack style={{ flex: 1 }} spacing={2} alignment="leading">
          <HStack style={{ paddingLeft: isTablet || isLandscape ? 45 : 30 }}>
            <Pressable
              onPress={() =>
                navigation.navigate(STUDENTS.SELECT_SETS, {
                  items: student.categories,
                  parent: route.name,
                  id,
                })
              }
            >
              <HStack
                alignment="center"
                style={{ backgroundColor: "transparent" }}
                spacing={5}
              >
                <AddButton size="xs" disabled />
                <Text style={StyleGuide.typography.inputLabel}>
                  Select Sets
                </Text>
              </HStack>
            </Pressable>
            <Spacer />
          </HStack>

          <HList
            data={arrayToarrays(student.categories)}
            style={{
              backgroundColor: "transparent",
              paddingLeft: StyleGuide.sizes.padding - 5,
            }}
            snapToInterval={
              4 *
              (StyleGuide.sizes.thumb.sm.width + 2 * StyleGuide.main.spacing)
            }
            renderItem={({ item }) => (
              <VStack spacing={5}>
                {item.map(({ index }) => {
                  let _item = student.categories[index];
                  return (
                    <Animated.View
                      key={index.toString()}
                      entering={ZoomInRotate.springify().delay(index * 20)}
                      layout={Layout.springify()}
                      style={{ marginHorizontal: StyleGuide.main.spacing }}
                    >
                      <Image
                        size="sm"
                        uri={_item.image}
                        defaultSource={_item.slug}
                      />
                    </Animated.View>
                  );
                })}
              </VStack>
            )}
          />
          <Spacer />
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                width: "100%",
                marginBottom: 20,
              },
            ]}
          >
            <Button
              size="lg"
              variant="gradient"
              title="Save"
              onPress={() => {
                editStudent(
                  id,
                  student.name,
                  student.categories,
                  student.image,
                  student.image != _std.image
                );
              }}
            />
          </View>
        </VStack>
      </ScrollView>
    </ContainerView>
  );
};

export default StudentEditScreen;
