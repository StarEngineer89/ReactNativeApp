import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { VStack, HStack, Spacer } from "react-native-stacks";
import { Button, Image } from "components/base";
import { fonts, palette, StyleGuide } from "src/config";
import { images } from "src/constants";

let SIZES = StyleGuide.main;

const EMPTY_TEXT_FONTSIZE = Platform.isPad ? 18 : 12;
const SPACING = Platform.isPad ? 18 : 10;
const ITEM_FONT_SIZE = Platform.isPad ? 16 : 10;
const IMAGE_WIDTH = Platform.isPad ? 200 : 114;
const IMAGE_HEIGHT = Platform.isPad ? 118 : 68;

const ITEM_WIDTH = Platform.isPad ? 690 : SIZES.width - 70;
const PADDING = Platform.isPad ? 50 : 35;
const BORDER_RADIUS = Platform.isPad ? 20 : 12;
const RIGHT_VIEW_PADDING_H = Platform.isPad ? 20 : 12;

const NewsList = ({
  data,
  sectionTitle = "Section Title",
  emptyListText = "No News available",
  style,
  onPressItem,
  ...props
}) => {
  const paddingHorizontal = Platform.isPad ? 50 : 35;

  return (
    <FlatList
      ListHeaderComponentStyle={{ marginBottom: 5 }}
      ListHeaderComponent={
        <HStack style={{ paddingHorizontal }}>
          <Text style={StyleGuide.typography.dashboardHeader}>
            {sectionTitle}
          </Text>
        </HStack>
      }
      data={data}
      alwaysBounceHorizontal={false}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text
            style={{
              fontSize: EMPTY_TEXT_FONTSIZE,
              color: palette.primary,
              fontFamily: fonts.bold,
            }}
          >
            {emptyListText}
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      {...props}
      style={{ flexGrow: 1, paddingTop: 35 }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => onPressItem(item)}>
            <HStack style={styles.itemStyle}>
              <Image
                uri={item.student.image}
                defaultSource={images.PLACEHOLDER}
                imgStyle={styles.imageStyle}
                style={styles.imageStyle}
              />

              <VStack style={styles.rightView} alignment="leading">
                <Text
                  style={{
                    fontSize: ITEM_FONT_SIZE,
                    color: palette.primary,
                    fontFamily: fonts.medium,
                  }}
                >
                  {`${item.student.name}${item.message}`}
                  <Text
                    style={{
                      fontSize: ITEM_FONT_SIZE,
                      color: palette.primary,
                      fontFamily: fonts.bold,
                    }}
                  >{`${item.category.name} Set.`}</Text>
                </Text>
                <Spacer />
              </VStack>
            </HStack>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginRight: SPACING,
    marginVertical: SPACING,
  },
  emptyListContainer: {
    paddingLeft: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginVertical: SPACING,
    marginRight: SPACING,
  },

  itemStyle: {
    marginHorizontal: PADDING,
    backgroundColor: palette.white,
    width: ITEM_WIDTH,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: palette.primary,
    marginVertical: 5,
    // flex: 1,
    overflow: "hidden",
  },
  imageStyle: {
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 0,
  },
  rightView: {
    height: IMAGE_HEIGHT - (Platform.isPad ? 20 : 10),
    paddingHorizontal: RIGHT_VIEW_PADDING_H,
    paddingVertical: 2,

    flex: 1,
  },
});

export default NewsList;
