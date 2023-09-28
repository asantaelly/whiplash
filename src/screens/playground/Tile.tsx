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
  useAnimatedStyle,
  cancelAnimation,
} from "react-native-reanimated";

import { LevelContext } from "../../providers/Level";

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

  /**
   *
   *  Play Tile Sound
   *
   */
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(chord);
      setSound(sound);

      await sound.playAsync();
    } catch (error) {
      console.log("Tile Sound Error: ", error);
    }
  };

  /**
   *
   *  Stop Tile Sound
   *
   */
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
    if (tapCounter >= 3200) {
      return (duration.value = Configurations.FINAL_DURATION);
    } else {
      return duration.value - tapCounter;
    }
  });

  const animatedTileStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  /**
   *
   * Play the Game function
   *
   *
   */
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

  /**
   *
   *  Restart the Game function
   *
   */
  const restart = () => {
    duration.value = Configurations.INITIAL_DURATION;
    translateY1.value = Configurations.INITIAL_TRANSLATEY;
    playGame();
  };

  /**
   *
   *  Tap Gesture Handler
   *
   */
  const tap = Gesture.Tap()
    .onBegin(() => {
      runOnJS(playSound)();
      translateY1.value = Configurations.INITIAL_TRANSLATEY;
    })
    .onFinalize(() => {
      // runOnJS(stopSound)();
      runOnJS(setTapCounter)(tapCounter + 10);
      runOnJS(playGame)();
    });

  /**
   *
   *  Action to start the game starts here
   *
   */
  React.useEffect(() => {
    if (play) {
      playGame();
    } else {
      cancelAnimation(translateY1);
    }
  }, [play]);

  /**
   *
   * Action to check loser!
   *
   */
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
