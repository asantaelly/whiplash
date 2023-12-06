import React from "react";
import { View, StyleSheet } from "react-native";

import Tile from "./Tile";
import tiles from "./tiles";
import { font } from "themes/fonts";
import AppLayout from "layouts/AppLayout";
import AppText from "components/libs/text/AppText";
import { LevelContext } from "providers/game-level";
import ScreenHeader from "components/screens/Header";
import LoserModal from "components/libs/modals/LoserModal";
import PauseModal from "components/libs/modals/PauseModal";

const Auditorium = () => {
  const [countDown, setCountDown] = React.useState(3);
  const { play, loser } = React.useContext(LevelContext);

  /** Count-Down Timer */
  React.useEffect(() => {
    if (countDown === 0) return;

    const countDownID = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(countDownID);
  }, [countDown]);

  return (
    <AppLayout style={[styles.container]}>
      <View style={[styles.header]}>
        <ScreenHeader />
      </View>
      {loser && <LoserModal />}
      {!play && <PauseModal />}
      {countDown !== 0 && play ? (
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
              chord={tile.chord}
              initialDelay={tile.initialDelay}
            />
          ))}
        </React.Fragment>
      )}
    </AppLayout>
  );
};

export default Auditorium;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    left: 0,
    right: 0,
    zIndex: 10,
    position: "absolute",
  },
  countDown: {
    opacity: 0.3,
  },
  countDownContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
