import React from "react";

type ComponentProps = {
  children: React.ReactNode;
};

type LevelProps = {
  loser: boolean;
  highScore: number;
  tapCounter: number;
  // getHighScore: () => void;
  setLoser: React.Dispatch<React.SetStateAction<boolean>>;
  setTapCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const LevelContext = React.createContext<LevelProps>(null);

const LevelProvider: React.FC<ComponentProps> = (props) => {
  const { children } = props;

  /** Context states */
  const [loser, setLoser] = React.useState<boolean>(false);
  const [tapCounter, setTapCounter] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(0);

  /** a function to calculate high score */
  // const getHighScore = () => {
  //   if (tapCounter > highScore) {
  //     setHighScore(tapCounter);
  //   }
  //   return;
  // };

  return (
    <LevelContext.Provider
      value={{
        loser,
        setLoser,
        highScore,
        tapCounter,
        // getHighScore,
        setTapCounter,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
