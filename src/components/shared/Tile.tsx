import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  Easing,
  runOnJS,
  withDelay,
  withRepeat,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  cancelAnimation,
} from "react-native-reanimated";

/** local imports */
import { LevelContext } from "../../providers/Level";

type Props = {
  index: number;
  initialDelay: number;
  deviceHeight?: number;
};

enum Configurations {
  FINAL_DURATION = 800,
  INITIAL_DURATION = 4000,
  INITIAL_TRANSLATEY = -500,
}

const Tile: React.FC<Props> = (props) => {
  const { height, width } = Dimensions.get("window");
  const { index, initialDelay, deviceHeight = height } = props;

  /** game level counter */
  const { loser, setLoser, tapCounter, setTapCounter } =
    React.useContext(LevelContext);

  const delay = useSharedValue(initialDelay);
  const duration = useSharedValue(Configurations.INITIAL_DURATION);
  const translateY1 = useSharedValue(Configurations.INITIAL_TRANSLATEY);

  const derivedDuration = useDerivedValue(() => {
    if (tapCounter >= 3200) {
      return (duration.value = Configurations.FINAL_DURATION);
    } else {
      return duration.value - tapCounter;
    }
  });

  const animatedTileStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  /** Game Play */
  const play = () => {
    translateY1.value = withDelay(
      delay.value,
      withRepeat(
        withTiming(
          deviceHeight,
          {
            duration: derivedDuration.value,
            easing: Easing.linear,
          },
          (finished) => {
            if (finished) {
              runOnJS(setLoser)(true);
            }

            return;
          }
        ),
        0,
        false
      )
    );
  };

  /** Game Restart */
  const restart = () => {
    duration.value = Configurations.INITIAL_DURATION;
    translateY1.value = Configurations.INITIAL_TRANSLATEY;
    play();
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      translateY1.value = Configurations.INITIAL_TRANSLATEY;
    })
    .onFinalize(() => {
      runOnJS(setTapCounter)(tapCounter + 10);
      runOnJS(play)();
    });

  /** TO BE REMOVED AND TURN IT TO INITIALIZER FUNCTION */
  React.useEffect(() => {
    play();
  }, []);

  React.useEffect(() => {
    if (loser) {
      cancelAnimation(translateY1);
    } else {
      restart();
    }
  }, [loser]);

//   React.useEffect(() => {
//     console.log("Tap counter: ", tapCounter / 10);
//     console.log("Speed in milliseconds: ", tapCounter);
//     console.log("Duration counter: ", derivedDuration.value);
//   }, [tapCounter, loser]);

  return (
    <View style={[styles.container]}>
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.tile, animatedTileStyle]}></Animated.View>
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
