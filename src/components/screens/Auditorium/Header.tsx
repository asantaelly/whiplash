import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** local imports */
import main from "../../../styles/main";
import { font } from "../../../themes/fonts";
import AppText from "../../libs/text/AppText";
import { LevelContext } from "../../../providers/Level";
import PressableIcon from "../../libs/icons/PressableIcon";

type Props = {
  route: any;
  navigation: any;
};

const Header: React.FC<Props> = (props) => {
  const { play, setPlay, tapCounter } = React.useContext(LevelContext);

  const point = tapCounter / 10;
  const pauseICON = play ? "pause" : "play";
  const pauseAction = () => setPlay((previous) => !previous);

  return (
    <SafeAreaView style={[styles.container]} edges={["top", "left", "right"]}>
      <View style={[styles.header, main.shadow]}>
        <View style={[styles.scoreBoard]}>
          <AppText style={[font.small_bold]}>{`Champion: 21342`}</AppText>
          <AppText style={[font.small_bold]}>{`Points: ${point}`}</AppText>
        </View>
        <View style={[styles.avatarCircular]}>
          <PressableIcon
            name={pauseICON}
            size={20}
            color="black"
            handleClick={pauseAction}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: "Orbitron-Medium",
  },
  scoreBoard: {
    gap: 5,
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    gap: 10,
    borderRadius: 50,
    paddingVertical: 15,
    marginHorizontal: 18,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    backgroundColor: "rgba(186, 205, 222, 0.6)",
  },
  avatarCircular: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#000000",
    backgroundColor: "transparent",
  },
  shadow: {
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 10,
    shadowRadius: 12,
    shadowOpacity: 0.9,
    shadowColor: "#000000",
    backgroundColor: "rgba(186, 205, 222, 0.6)",
  },
});

export default Header;
