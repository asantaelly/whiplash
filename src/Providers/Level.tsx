import React from "react";

type ComponentProps = {
  children: React.ReactNode;
};

type LevelProps = {
  tapCounter: number;
  setTapCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const LevelContext = React.createContext<LevelProps>(null);

const LevelProvider: React.FC<ComponentProps> = (props) => {
  const { children } = props;
  const [tapCounter, setTapCounter] = React.useState(0);

  return (
    <LevelContext.Provider value={{ tapCounter, setTapCounter }}>
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
