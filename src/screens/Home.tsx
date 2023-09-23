import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLayout from "../layouts/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <View style={[styles.playerContainer]}>
        <View style={[styles.circle, { backgroundColor: "green" }]}></View>
      </View>
      <View
        style={[
          styles.playerContainer,
          { alignItems: "flex-end", justifyContent: "flex-end" },
        ]}
      >
        <View style={[styles.circle, { backgroundColor: "blue" }]}></View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    borderWidth: 1,
    // borderColor: "#000000",
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 500,
  },
});

export default Home;
