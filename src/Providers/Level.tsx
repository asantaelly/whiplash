import React from "react";

type ComponentProps = {
  children: React.ReactNode;
};

type LevelProps = {
  loser: boolean;
  tapCounter: number;
  setLoser: React.Dispatch<React.SetStateAction<boolean>>;
  setTapCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const LevelContext = React.createContext<LevelProps>(null);

const LevelProvider: React.FC<ComponentProps> = (props) => {
  const { children } = props;

  /** Context states */
  const [loser, setLoser] = React.useState<boolean>(false);
  const [tapCounter, setTapCounter] = React.useState<number>(0);

  return (
    <LevelContext.Provider
      value={{ loser, setLoser, tapCounter, setTapCounter }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
