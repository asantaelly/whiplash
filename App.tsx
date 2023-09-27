import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LevelProvider from "./src/providers/Level";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { fonts } from "./src/themes/fonts/index";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  const OnLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={OnLayoutRootView}>
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
