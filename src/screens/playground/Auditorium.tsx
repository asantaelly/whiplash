import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  LayoutChangeEvent,
} from "react-native";

import AppLayout from "../../layouts/AppLayout";
import Tile from "./Tile";
import { LevelContext } from "../../providers/Level";
import LoserModal from "../../components/libs/modals/LoserModal";
import tiles from "./tiles";
import AppText from "../../components/libs/text/AppText";
import { font } from "../../themes/fonts";

const Auditorium = () => {
  // const [loserModal, setLoserModal] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState<number | null>(null);

  /** start count down */
  const [countDown, setCountDown] = React.useState(3);

  /** game Progress Context */
  const { loser, setLoser, setTapCounter } = React.useContext(LevelContext);

  const viewLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  /** count down */
  React.useEffect(() => {
    if (countDown === 0) return;

    const countDownID = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(countDownID);
  }, [countDown]);


  /** check the state to play the game is set */
  // if(play) {
  //   return p
  // }

  return (
    <AppLayout onLayout={viewLayout}>
      {viewHeight === null ? (
        <View style={[styles.indicatorContainer]}>
          <ActivityIndicator size={"large"} color={"#000000"} />
        </View>
      ) : (
        <View style={[styles.container]}>
          {loser && <LoserModal />}
          {countDown !== 0 ? (
            <View style={[styles.countDownContainer]}>
              <AppText style={[font.extremeLarge_bold, styles.countDown]}>
                {countDown}
              </AppText>
            </View>
          ) : (
            <React.Fragment>
              {tiles.map((tile, key) => (
                <Tile
                  key={key}
                  index={tile.index}
                  initialDelay={tile.initialDelay}
                />
              ))}
            </React.Fragment>
          )}
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
  largeText: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "800",
  },
  countDown: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  countDownContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Auditorium;
