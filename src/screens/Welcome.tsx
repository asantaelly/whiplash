import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import main from "../styles/main";
import { font } from "../themes/fonts";
import AppLayout from "../layouts/AppLayout";
import AppText from "../components/libs/text/AppText";
import { MainStackProps } from "../navigation/routes/Main";

const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackProps>>();

  const playGround = () => navigation.navigate("Auditorium");

  return (
    <AppLayout>
      <View style={[styles.container]}>
        <View style={[styles.upperContainer]}>
          <AppText style={[font.large_bold]}>TileRhythm</AppText>
        </View>
        <View style={[styles.bottomContainer]}>
          <TouchableOpacity style={[styles.button, main.shadow]} onPress={playGround}>
            <AppText style={[font.medium_bold, styles.buttonText]}>
              Start Game
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  upperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
  },
  buttonText: {
    color: "#000000",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: "black",
  },
});

export default Welcome;
