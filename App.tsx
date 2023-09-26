import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LevelProvider from "./src/providers/Level";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={[{ flex: 1 }]}>
        <LevelProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </SafeAreaProvider>
        </LevelProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
