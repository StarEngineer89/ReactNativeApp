import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SETS } from "src/constants/routes";
import { useTeacher } from "src/hooks";
import { Button, ContainerView, GridList } from "components/base";
import { HStack, VStack, Spacer } from "react-native-stacks";
import { CustomSetImageUploader, GridListItem } from "components/custom";
import { ProgressComponent } from "components/main";
import Animated, { Layout, SlideInLeft } from "react-native-reanimated";
import { StyleGuide } from "src/config";
import { Listen } from "components/svgs";
import { playSound } from "src/functions";
import { DeletingModal } from "components/modals";

const SetDetailsScreen = ({ route, navigation }) => {
  const { id, predefined } = route.params;
  const { state, getCategory, clearCategory, addSetItem, deleteSetItem } =
    useTeacher();
  const [showConfirm, setshowConfirm] = useState(false);
  const [deleteItem, setdeleteItem] = useState(null);

  const [itemIndex, setItemIndexIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => getCategory(id, predefined), 1000);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        state.currentCategory &&
        !predefined &&
        state.currentCategory.length < 5 ? (
          <CustomSetImageUploader
            onSelectImage={(image) => addSetItem(id, image)}
          />
        ) : null,
    });
  }, [state.currentCategory]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      if (route.params?.itemIndex) setItemIndexIndex(route.params?.itemIndex);
    });

    const unsubscribe1 = navigation.addListener("beforeRemove", () => {
      // do something
      clearCategory();
    });

    return () => {
      unsubscribe();
      unsubscribe1();
    };
  }, [route.params]);

  if (state.currentCategory === null) return <ProgressComponent />;

  return (
    <ContainerView>
      <DeletingModal
        show={showConfirm}
        onCancel={() => setshowConfirm(false)}
        onDelete={() => {
          deleteSetItem(deleteItem._id);
          setshowConfirm(false);
        }}
      />
      <GridList
        paginated
        itemsPerPage={7}
        data={state.currentCategory}
        renderDetails={({ item, index }) => {
          return (
            <Animated.View
              entering={SlideInLeft.springify().delay(index * 10)}
              layout={Layout.delay(200)}
            >
              <GridListItem
                uri={item.image}
                defaultSource={item.slug}
                onPress={() =>
                  navigation.push(SETS.EDIT_DETAILS, {
                    subCategoryIndex: index,
                    predefined,
                  })
                }
              >
                <VStack style={{ flex: 1 }} alignment="leading">
                  <Spacer />
                  <HStack>
                    <Text
                      numOfLines={2}
                      style={StyleGuide.typography.gridItemHeader}
                    >
                      {item.name}
                    </Text>
                    <Spacer />
                    {item.voiceURL && (
                      <TouchableOpacity
                        onPress={() => playSound(item.voiceURL)}
                        activeOpacity={1}
                        style={{ padding: 10 }}
                      >
                        <Listen
                          width={StyleGuide.sizes.listenIcon}
                          height={StyleGuide.sizes.listenIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </HStack>
                  <Spacer />
                  {!item.predefined && (
                    <HStack>
                      <Spacer />
                      <Button
                        variant="dangerFilled"
                        size="sm"
                        title="Delete"
                        onPress={() => {
                          setshowConfirm(true);
                          setdeleteItem(item);
                        }}
                      />
                    </HStack>
                  )}
                </VStack>
              </GridListItem>
            </Animated.View>
          );
        }}
      />
    </ContainerView>
  );
};

export default SetDetailsScreen;
