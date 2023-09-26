import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/** local imports */
import { LevelContext } from "../../../providers/Level";
import { MainStackProps } from "../../../navigation/routes/Main";

const LoserModal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackProps>>();

  const { setLoser, setTapCounter } = React.useContext(LevelContext);

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
  largeText: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "800",
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
});

export default LoserModal;
