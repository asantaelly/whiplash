import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  LayoutChangeEvent,
} from "react-native";

import AppLayout from "../layouts/AppLayout";
import Tile from "../components/shared/Tile";

const Auditorium = () => {
  /** screen dimensions */
  const [viewHeight, setViewHeight] = React.useState<number | null>(null);

  const viewLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  return (
    <AppLayout onLayout={viewLayout}>
      {viewHeight === null ? (
        <View style={[styles.indicatorContainer]}>
          <ActivityIndicator size={"large"} color={"#000000"} />
        </View>
      ) : (
        <View style={[styles.container]}>
          <Tile index={1} initialDelay={2200} deviceHeight={viewHeight} />
          <Tile index={2} initialDelay={1800} deviceHeight={viewHeight} />
          <Tile index={3} initialDelay={1200} deviceHeight={viewHeight} />
          <Tile index={4} initialDelay={1500} deviceHeight={viewHeight} />
        </View>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Auditorium;
