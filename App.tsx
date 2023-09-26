import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "./src/navigation/AppNavigator";
import LevelProvider from "./src/Providers/Level";

export default function App() {
  return (
    <GestureHandlerRootView style={[{ flex: 1 }]}>
      <LevelProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </SafeAreaProvider>
      </LevelProvider>
    </GestureHandlerRootView>
  );
}
