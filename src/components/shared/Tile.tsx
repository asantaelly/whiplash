import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  delay: number;
  dropTime?: number;
  height?: number;
};

const Tile: React.FC<Props> = (props) => {
  const { delay = 1000, dropTime, height = 900 } = props;
  const translateY1 = useSharedValue(-200);
  const duration = useSharedValue(3500);


  const animatedTileStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  const action = () => {
    translateY1.value = withDelay(
      delay,
      withRepeat(
        withTiming(height, {
          duration: duration.value,
          easing: Easing.linear,
        }),
        0,
        false
      )
    );
  };

  const tilePath = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    console.log('Time Dimension: ', width, height, x, y);
  };

  /** handling tap action */
  const tap = Gesture.Tap()
    .onBegin(() => {
      translateY1.value = -200;
    })
    .onFinalize(() => {
      translateY1.value = withDelay(
        delay,
        withRepeat(
          withTiming(height, {
            duration: duration.value,
            easing: Easing.linear,
          }),
          0,
          false
        )
      );
    });

  React.useEffect(() => {
    action();
  }, []);

  return (
    <View style={[styles.container]}>
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.tile, animatedTileStyle]} onLayout={tilePath}></Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  tile: {
    width: 80,
    height: 120,
    backgroundColor: "#000000",
  },
});

export default Tile;
