import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import PressableIcon from "../../libs/icons/PressableIcon";
import React, { useContext } from "react";
import { LevelContext } from "../../../providers/Level";

type Props = {
  route: any;
  navigation: any;
};

const Header: React.FC<Props> = (props) => {
  const { tapCounter } = React.useContext(LevelContext);

  const point = tapCounter / 10;

  return (
    <SafeAreaView style={[styles.container]} edges={["top", "left", "right"]}>
      <View style={[styles.header, styles.shadow]}>
        <View style={[styles.scoreBoard]}>
          <Text style={[{ fontWeight: "600" }]}>Champion: 12000</Text>
          <Text style={[{ fontWeight: "600" }]}>Points: {point}</Text>
        </View>
        <View style={[styles.avatarCircular]}>
          <PressableIcon
            name="pause"
            size={20}
            color="black"
            handleClick={() => console.log("Clicked")}
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
    // backgroundColor: "#FFF"
  },
  scoreBoard: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  header: {
    flex: 1,
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 20,
    // opacity: 0.7,
    borderRadius: 50,
    // borderWidth: 2,
  },
  avatarCircular: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#000000",
    // backgroundColor: "#FFFFFF",
  },
  shadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowColor: "#000000",
    shadowRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default Header;
