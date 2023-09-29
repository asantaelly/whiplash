import React from "react";
import * as SecureStore from "expo-secure-store";

import MainStack from "./routes/Main";
import { LevelContext } from "../providers/Level";

const AppNavigator = () => {
  const { setHighScore } = React.useContext(LevelContext);

  React.useEffect(() => {
    SecureStore.getItemAsync("champion")
      .then((highscore) => {
        if (highscore) {
          setHighScore(parseInt(highscore));
        }
      })
      .catch((error) => {
        console.log("Failed to load resources from storage: ", error);
      });
  }, []);

  return <MainStack />;
};

export default AppNavigator;
