import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { font } from "themes/fonts";
import AppText from "../text/AppText";
import { LevelContext } from "providers/game-level";
import { MainStackProps } from "navigation/routes/Main";

const PauseModal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackProps>>();

  const { setPlay, setTapCounter, checkHighScore } =
    React.useContext(LevelContext);

  const resume = () => setPlay(true);

  const quit = () => {
    checkHighScore();
    setPlay(false);
    setTapCounter(0);
    navigation.navigate("Welcome");
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContent]}>
          <AppText style={[font.xxLarge_bold]}>Game Paused!</AppText>
          <View style={[styles.buttons]}>
            <TouchableOpacity style={[styles.button]} onPress={quit}>
              <AppText style={[font.medium_bold, { color: "#ffffff" }]}>
                Quit
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={resume}>
              <AppText style={[font.medium_bold, { color: "#ffffff" }]}>
                Resume
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  buttons: {
    gap: 20,
    flexDirection: "row",
  },
  largeText: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "800",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
});

export default PauseModal;
