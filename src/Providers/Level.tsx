import React from "react";
import * as SecureStore from "expo-secure-store";

type ComponentProps = {
  children: React.ReactNode;
};

type LevelProps = {
  play: boolean;
  loser: boolean;
  highScore: number;
  tapCounter: number;
  checkHighScore: () => void;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setLoser: React.Dispatch<React.SetStateAction<boolean>>;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  setTapCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const LevelContext = React.createContext<LevelProps>(null);

const LevelProvider: React.FC<ComponentProps> = (props) => {
  const { children } = props;

  const [play, setPlay] = React.useState<boolean>(false);
  const [loser, setLoser] = React.useState<boolean>(false);
  const [highScore, setHighScore] = React.useState<number>(0);
  const [tapCounter, setTapCounter] = React.useState<number>(0);

  const checkHighScore = () => {
    if (tapCounter > highScore) {
      setHighScore(tapCounter);
      SecureStore.setItemAsync("champion", highScore.toString());
    }
  };

  return (
    <LevelContext.Provider
      value={{
        play,
        loser,
        setPlay,
        setLoser,
        highScore,
        tapCounter,
        setHighScore,
        setTapCounter,
        checkHighScore,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
