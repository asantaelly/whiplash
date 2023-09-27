import React from "react";
import * as SecureStore from "expo-secure-store";

import MainStack from "./routes/Main";
import { LevelContext } from "../providers/Level";

const AppNavigator = () => {
 
  return <MainStack />;
};

export default AppNavigator;
