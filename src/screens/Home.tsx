import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import AppLayout from "../layouts/AppLayout";

const Home = () => {
  const translateY1 = useSharedValue(0);
  const translateY2 = useSharedValue(0);
  const translateY3 = useSharedValue(0);
  const translateY4 = useSharedValue(0);


  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY2.value }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY3.value }],
  }));

  const animatedStyle4 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY4.value }],
  }));

  const viewLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    console.log("Layout: width, height, x, y ", width, height, x, y);
  };

  React.useEffect(() => {
    translateY1.value = withRepeat(
      withTiming(900, {
        duration: 3000,
        easing: Easing.linear,
      }),
      0,
      false
    );

    translateY2.value = withRepeat(
      withTiming(900, {
        duration: 2000,
        easing: Easing.linear,
      }),
      0,
      false
    );

    translateY3.value = withRepeat(
      withTiming(900, {
        duration: 1000,
        easing: Easing.linear,
      }),
      0,
      false
    );

    translateY4.value = withRepeat(
      withTiming(900, {
        duration: 500,
        easing: Easing.linear,
      }),
      0,
      false
    );
  }, []);

  return (
    <AppLayout onLayout={viewLayout}>
      <View style={[styles.container]}>
        <View
          style={[
            { flex: 1, alignItems: "center", backgroundColor: "", padding: 40 },
          ]}
        >
          <Animated.View style={[styles.box, animatedStyle1]}></Animated.View>
        </View>
        <View
          style={[
            { flex: 1, alignItems: "center", backgroundColor: "", padding: 40 },
          ]}
        >
          <Animated.View style={[styles.box, animatedStyle2]}></Animated.View>

        </View>
        <View
          style={[
            { flex: 1, alignItems: "center", backgroundColor: "", padding: 40 },
          ]}
        >
                    <Animated.View style={[styles.box, animatedStyle3]}></Animated.View>

        </View>
        <View
          style={[
            { flex: 1, alignItems: "center", backgroundColor: "", padding: 40 },
          ]}
        >
                    <Animated.View style={[styles.box, animatedStyle4]}></Animated.View>

        </View>
      </View>
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
  playerContainer: {
    flex: 1,
    borderWidth: 1,
    // borderColor: "#000000",
  },
  container1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  container2: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  box: {
    width: 80,
    height: 120,
    backgroundColor: "#000000",
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 500,
  },
});

export default Home;
