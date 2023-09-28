import React from "react";

type ComponentProps = {
  children: React.ReactNode;
};

type LevelProps = {
  play: boolean;
  pause: boolean;
  loser: boolean;
  tapCounter: number;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setLoser: React.Dispatch<React.SetStateAction<boolean>>;
  setTapCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const LevelContext = React.createContext<LevelProps>(null);

const LevelProvider: React.FC<ComponentProps> = (props) => {
  const { children } = props;

  const [play, setPlay] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);
  const [loser, setLoser] = React.useState<boolean>(false);
  const [tapCounter, setTapCounter] = React.useState<number>(0);

  return (
    <LevelContext.Provider
      value={{
        play,
        pause,
        loser,
        setPlay,
        setPause,
        setLoser,
        tapCounter,
        setTapCounter,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
