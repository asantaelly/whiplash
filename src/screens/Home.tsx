import React from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";

import AppLayout from "../layouts/AppLayout";
import Tile from "../components/shared/Tile";

const Home = () => {
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
          <Tile delay={1000} />
          {/* <Tile delay={2000} />
          <Tile delay={2500} />
          <Tile delay={500} /> */}
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

export default Home;
