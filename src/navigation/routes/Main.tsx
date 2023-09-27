import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** local imports */
import Welcome from "../../screens/Welcome";
import Header from "../../components/screens/Auditorium/Header";
import Auditorium from "../../screens/playground/Auditorium";

export type MainStackProps = {
  Welcome: undefined;
  Auditorium: undefined;
};

const AppStack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {
  return (
    <AppStack.Navigator initialRouteName="Welcome" screenOptions={{
      headerShown: true
    }}>
      <AppStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Auditorium"
        component={Auditorium}
        options={({ navigation, route }) => ({
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
    </AppStack.Navigator>
  );
};

export default MainStack;
