import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  LayoutChangeEvent,
} from "react-native";

import AppLayout from "../layouts/AppLayout";
import Tile from "../components/shared/Tile";
import { LevelContext } from "../providers/Level";
import { MainStackProps } from "../navigation/routes/Main";

const Auditorium = () => {
  const [loserModal, setLoserModal] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState<number | null>(null);

  /** start count down */
  const [countDown, setCountDown] = React.useState(3);

  /** Game Progress Context */
  const { loser, setLoser, setTapCounter } = React.useContext(LevelContext);

  const viewLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setViewHeight(height);
  };

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
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    gap: 40,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    gap: 20,
    flexDirection: "row",
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

const LoserModal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackProps>>();

  const { loser, setLoser, setTapCounter } = React.useContext(LevelContext);

  const restart = () => {
    setLoser(false);
    setTapCounter(0);
    return;
  };

  const quit = () => {
    setLoser(false);
    setTapCounter(0);
    navigation.navigate("Welcome");
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContent]}>
          <Text style={[styles.largeText]}>You Lost!</Text>
          <View style={[styles.buttons]}>
            <TouchableOpacity style={[styles.button]} onPress={quit}>
              <Text style={[styles.buttonText, { color: "#ffffff" }]}>
                Quit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={restart}>
              <Text style={[styles.buttonText, { color: "#ffffff" }]}>
                Restart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
