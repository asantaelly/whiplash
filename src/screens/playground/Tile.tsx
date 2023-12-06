import React from "react";
import { AVPlaybackSource, Audio } from "expo-av";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  Easing,
  runOnJS,
  withDelay,
  withRepeat,
  withTiming,
  useSharedValue,
  useDerivedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";

import { LevelContext } from "providers/game-level";

type Props = {
  index: number;
  initialDelay: number;
  chord?: AVPlaybackSource;
};

enum Configurations {
  FINAL_DURATION = 800,
  INITIAL_DURATION = 4000,
  INITIAL_TRANSLATEY = -500,
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Tile: React.FC<Props> = (props) => {
  const { index, chord, initialDelay } = props;
  const [sound, setSound] = React.useState<Audio.Sound>(null);
  const { play, loser, setLoser, tapCounter, setTapCounter } =
    React.useContext(LevelContext);

  const playSound = async () => {
    stopSound();

    try {
      const { sound } = await Audio.Sound.createAsync(chord);
      setSound(sound);

      await sound.playAsync();
    } catch (error) {
      console.log("Tile Sound Error: ", error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    } catch (error) {
      console.log("Tile Sound Error: ", error);
    }
  };

  const delay = useSharedValue(initialDelay);
  const duration = useSharedValue(Configurations.INITIAL_DURATION);
  const translateY1 = useSharedValue(Configurations.INITIAL_TRANSLATEY);

  const derivedDuration = useDerivedValue(() => {
    const timer = tapCounter * 20;
    if (timer >= 3200) {
      return (duration.value = Configurations.FINAL_DURATION);
    } else {
      return duration.value - timer;
    }
  });

  const animatedTileStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  /** Game init */
  const playGame = () => {
    translateY1.value = withDelay(
      delay.value,
      withRepeat(
        withTiming(
          screenHeight,
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

  const restart = () => {
    duration.value = Configurations.INITIAL_DURATION;
    translateY1.value = Configurations.INITIAL_TRANSLATEY;
    playGame();
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      runOnJS(playSound)();
      translateY1.value = Configurations.INITIAL_TRANSLATEY;
    })
    .onFinalize(() => {
      runOnJS(setTapCounter)(tapCounter + 1);
      runOnJS(playGame)();
    })
    .onTouchesCancelled(() => {
      runOnJS(stopSound)();
    });

  React.useEffect(() => {
    if (play) {
      playGame();
    } else {
      cancelAnimation(translateY1);
    }
  }, [play]);

  /** For losers only */
  React.useEffect(() => {
    if (loser) {
      cancelAnimation(translateY1);
    } else {
      restart();
    }
  }, [loser]);

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
