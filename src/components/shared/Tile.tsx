import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import Animated, {
  Easing,
  runOnJS,
  withDelay,
  withRepeat,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  index: number;
  initialDelay: number;
  deviceHeight: number;
};

const Tile: React.FC<Props> = (props) => {
  const { index, initialDelay, deviceHeight } = props;

  const [tapCount, setTapCount] = React.useState(0);

  const initialTransalteY = -300;
  const translateY1 = useSharedValue(initialTransalteY);

  const initialDuration = 4000;
  const duration = useSharedValue(initialDuration);

  const finalDuration = 800;

  const derivedDuration = useDerivedValue(() => {
    if (tapCount >= 3200) {
      return (duration.value = finalDuration);
    } else {
      return duration.value - tapCount;
    }
  });

  const delay = useSharedValue(initialDelay);

  const animatedTileStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  const action = () => {
    translateY1.value = withDelay(
      delay.value,
      withRepeat(
        withTiming(deviceHeight, {
          duration: derivedDuration.value,
          easing: Easing.linear,
        }),
        0,
        false
      )
    );
  };

  const tilePath = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      translateY1.value = initialTransalteY;
    })
    .onFinalize(
      (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
        runOnJS(setTapCount)(tapCount + 100);
        translateY1.value = withDelay(
          delay.value,
          withRepeat(
            withTiming(deviceHeight, {
              duration: derivedDuration.value,
              easing: Easing.linear,
            }),
            0,
            false
          )
        );
      }
    );

  React.useEffect(() => {
    action();
    console.log("On mount only");
  }, []);

  React.useEffect(() => {
    console.log("Tile No: ", index);
    console.log("Tap Count: ", tapCount);
    console.log("Delay duration", delay.value);
    console.log("Derived duration: ", derivedDuration.value);
  }, [tapCount]);

  return (
    <View style={[styles.container]}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[styles.tile, animatedTileStyle]}
          onLayout={tilePath}
        ></Animated.View>
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
    height: 180,
    backgroundColor: "#000000",
  },
});

export default Tile;
