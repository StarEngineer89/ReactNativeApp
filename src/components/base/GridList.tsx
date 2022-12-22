import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  FlatListProps,
  ActivityIndicator,
} from "react-native";
import { palette } from "src/config";
import { useDeviceInfo } from "src/hooks";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

interface GridListProps extends Omit<FlatListProps<any>, "renderItem"> {
  numOfColumns?: { tablet?: number; landscape?: number; mobile?: number };
  renderDetails: React.FC<{ item: any; index: number }>;
  paginated?: Boolean;
  itemsPerPage?: number;
}

const GridList = ({
  paginated = false,
  itemsPerPage = 10,
  numOfColumns: { tablet = 2, landscape = 3, mobile = 1 } = {},
  ...props
}: GridListProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { isTablet, isLandscape } = useDeviceInfo();

  useEffect(() => {
    setItems(paginated ? props.data.slice(0, page * itemsPerPage) : props.data);

    setLoading(false);
    return () => {};
  }, [page, props.data]);

  let paddingHorizontal = 30;
  let spacing = isTablet || isLandscape ? 10 : 5;

  const numColumns = isTablet ? (isLandscape ? landscape : tablet) : mobile;

  const handleLoadMore = () => {
    if (props.data.length > page * itemsPerPage) {
      setPage(page + 1);
      setLoading(true);
    }
  };

  return (
    <FlatList
      onEndReached={() => {
        if (paginated) handleLoadMore();
      }}
      onEndReachedThreshold={0}
      ListFooterComponentStyle={{
        justifyContent: "center",
        alignSelf: "center",
      }}
      ListFooterComponent={
        loading && <ActivityIndicator size="small" color={palette.primary} />
      }
      {...props}
      data={formatData(items, numColumns)}
      numColumns={numColumns}
      key={numColumns}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        if (item.empty === true) {
          return <View style={[{ margin: spacing }, styles.itemInvisible]} />;
        }

        return (
          <View style={[{ margin: spacing }]}>
            {props.renderDetails({ item, index })}
          </View>
        );
      }}
      style={[styles.container, { paddingHorizontal }, props.style]}
      contentContainerStyle={[
        styles.contentContainer,
        props.contentContainerStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});

export default GridList;

/**
 * 
 * 
 * 
 * return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
 */
