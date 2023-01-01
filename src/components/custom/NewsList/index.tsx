import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { VStack, HStack, Spacer } from 'react-native-stacks';
import { Image } from 'components/base';
import { fonts, palette, StyleGuide } from 'src/config';
import { images } from 'src/constants';
import { FlatListProps } from 'react-native';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import { News } from 'src/entities';
import { isPad } from 'src/functions';

let SIZES = StyleGuide.main;

const EMPTY_TEXT_FONTSIZE = isPad() ? 18 : 12;
const SPACING = isPad() ? 18 : 10;
const ITEM_FONT_SIZE = isPad() ? 16 : 10;
const IMAGE_HEIGHT = isPad() ? 118 : 68;

const ITEM_WIDTH = isPad() ? 690 : SIZES.width - 70;
const PADDING = isPad() ? 50 : 35;
const BORDER_RADIUS = isPad() ? 20 : 12;
const RIGHT_VIEW_PADDING_H = isPad() ? 20 : 12;

interface Props extends Omit<FlatListProps<News>, 'renderItem'> {
  sectionTitle?: string;
  emptyListText?: string;
  style?: StyleProp<ViewStyle>;
  data: News[];
  onPressItem?: (item: News) => void;
}

const NewsList = ({ data, sectionTitle = 'Section Title', emptyListText = 'No News available', style, onPressItem, ...props }: Props) => {
  const paddingHorizontal = isPad() ? 50 : 35;

  return (
    <FlatList
      ListHeaderComponentStyle={{ marginBottom: 5 }}
      ListHeaderComponent={
        <HStack style={{ paddingHorizontal }}>
          <Text style={StyleGuide.typography.dashboardHeader}>{sectionTitle}</Text>
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
            }}>
            {emptyListText}
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      {...props}
      style={{ flexGrow: 1, paddingTop: 35 }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => onPressItem(item)}>
            <HStack style={styles.itemStyle}>
              <Image uri={item.student.image} defaultSource={images.BACKGROUND} imgStyle={styles.imageStyle} style={styles.imageStyle} />

              <VStack style={styles.rightView} alignment="leading">
                <Text
                  style={{
                    fontSize: ITEM_FONT_SIZE,
                    color: palette.primary,
                    fontFamily: fonts.medium,
                  }}>
                  {`${item.student.name}${item.message}`}
                  <Text
                    style={{
                      fontSize: ITEM_FONT_SIZE,
                      color: palette.primary,
                      fontFamily: fonts.bold,
                    }}>{`${item.category.name} Set.`}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  imageStyle: {
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 0,
  },
  rightView: {
    height: IMAGE_HEIGHT - (isPad() ? 20 : 10),
    paddingHorizontal: RIGHT_VIEW_PADDING_H,
    paddingVertical: 2,

    flex: 1,
  },
});

export default NewsList;
