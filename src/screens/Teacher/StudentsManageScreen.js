import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { STUDENTS } from "src/constants/routes";
import { DeletingModal } from "components/modals";
import { HStack, Spacer, VStack } from "react-native-stacks";
import { useTeacher, useDeviceInfo } from "src/hooks";
import Animated, {
  Layout,
  SlideInLeft,
  ZoomOut,
} from "react-native-reanimated";
import { AddButton } from "components/custom";
import { ContainerView, Image, Button } from "components/base";

const StudentsManageScreen = ({ navigation }) => {
  const { state, addStudent, deleteStudent } = useTeacher();
  const [showConfirm, setshowConfirm] = useState(false);
  const [deleteItem, setdeleteItem] = useState(null);
  const { isTablet, isLandscape } = useDeviceInfo();

  const NUM_OF_COLS = !isLandscape && (isTablet ? 2 : 1);
  const CELL_WIDTH = isTablet ? (isLandscape ? 160 : 340) : 300;
  const CELL_SPACING = isTablet ? (isLandscape ? 20 : 10) : 12;

  return (
    <ContainerView>
      <DeletingModal
        show={showConfirm}
        onCancel={() => setshowConfirm(false)}
        onDelete={() => {
          deleteStudent(deleteItem._id);
          setshowConfirm(false);
        }}
      />
      <VStack
        style={{ flex: 1 }}
        alignment={isLandscape ? "leading" : "center"}
      >
        {isLandscape && (
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                width: CELL_WIDTH,
                margin: CELL_SPACING,
              },
            ]}
          >
            <AddButton onPress={addStudent} />
          </View>
        )}
        <FlatList
          data={state.students}
          horizontal={isLandscape}
          numColumns={NUM_OF_COLS}
          key={NUM_OF_COLS}
          // style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            alignSelf: isLandscape ? "flex-start" : "center",
            paddingTop: 10,
          }}
          renderItem={({ item, index }) => {
            return (
              <Animated.View
                entering={SlideInLeft.springify().delay(200)}
                exiting={ZoomOut.delay(200)}
                layout={Layout.delay(500)}
              >
                <HStack
                  style={[
                    {
                      margin: CELL_SPACING,
                      width: CELL_WIDTH,
                      backgroundColor: "transparent",
                    },
                    isLandscape && { flexDirection: "column" },
                  ]}
                  alignment="center"
                >
                  <Image
                    uri={item.image}
                    uploading={item.uploading ? item.uploading : undefined}
                  />
                  {!isLandscape && <Spacer />}
                  <VStack spacing={1} style={isLandscape && { marginTop: 10 }}>
                    <Button
                      title="Edit Student"
                      variant="outline"
                      size="md"
                      onPress={() =>
                        navigation.navigate(STUDENTS.EDIT, { id: item._id })
                      }
                    />
                    <Button
                      title="Check Progress"
                      variant="outline"
                      size="md"
                      onPress={() =>
                        navigation.navigate(STUDENTS.CLASS_SETS, {
                          title: item.name,
                          studentId: item._id,
                        })
                      }
                    />
                    <Button
                      title="Delete Student"
                      variant="gradient"
                      size="md"
                      onPress={() => {
                        setshowConfirm(true);
                        setdeleteItem(item);
                      }}
                    />
                  </VStack>
                </HStack>
              </Animated.View>
            );
          }}
          ListFooterComponentStyle={{ margin: CELL_SPACING }}
          ListFooterComponent={
            !isLandscape && (
              <Animated.View entering={SlideInLeft.springify().delay(300)}>
                <AddButton size="md" onPress={addStudent} />
              </Animated.View>
            )
          }
        />
      </VStack>
    </ContainerView>
  );
};

export default StudentsManageScreen;
