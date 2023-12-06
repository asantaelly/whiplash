import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "screens/Welcome";
import Auditorium from "screens/playground/Auditorium";

export type MainStackProps = {
  Welcome: undefined;
  Auditorium: undefined;
};

const AppStack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="Welcome" component={Welcome} />
      <AppStack.Screen name="Auditorium" component={Auditorium} />
    </AppStack.Navigator>
  );
};

export default MainStack;
