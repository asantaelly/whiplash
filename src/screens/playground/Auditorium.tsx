import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  LayoutChangeEvent,
} from "react-native";

import AppLayout from "../../layouts/AppLayout";
import Tile from "../../components/shared/Tile";
import { LevelContext } from "../../providers/Level";
import LoserModal from "../../components/libs/modals/LoserModal";

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
              <Text style={[styles.extraLargeText]}>{countDown}</Text>
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

const tiles = [
  {
    index: 1,
    initialDelay: 1800,
  },
  {
    index: 2,
    initialDelay: 2000,
  },
  {
    index: 3,
    initialDelay: 2200,
  },
  {
    index: 4,
    initialDelay: 3000,
  },
];

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
  extraLargeText: {
    opacity: 0.3,
    fontSize: 120,
    fontWeight: "bold",
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
