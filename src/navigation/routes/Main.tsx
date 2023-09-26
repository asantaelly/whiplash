import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** local imports */
import Welcome from "../../screens/Welcome";
import Auditorium from "../../screens/Auditorium";

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
