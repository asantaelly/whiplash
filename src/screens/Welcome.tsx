import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppLayout from "../layouts/AppLayout";
import { MainStackProps } from "../navigation/routes/Main";

const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackProps>>();

  const playGround = () => navigation.navigate("Auditorium");

  return (
    <AppLayout>
      <View style={[styles.container]}>
        <View style={[styles.upperContainer]}>
          <Text style={[styles.largeText]}>Whiplash</Text>
        </View>
        <View style={[styles.bottomContainer]}>
          <TouchableOpacity style={[styles.button]} onPress={playGround}>
            <Text style={[styles.buttonText, { color: "#ffffff" }]}>
              Start Play
            </Text>
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
  largeText: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "800",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: "black",
  },
});

export default Welcome;
