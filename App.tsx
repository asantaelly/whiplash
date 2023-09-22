import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Auditorium from "./screens/Index";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <View style={styles.container}>
        <Auditorium />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
