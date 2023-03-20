import React, { useState, createContext, useContext } from "react";
import { Card, GameState } from "../types/game-types";

export interface IGameContext {
  stateOfGame: GameState | "new";
  setStateOfGame: (state: GameState | "new") => void;
  cards: Array<Card>;
  setCards: (cards: Array<Card>) => void;
  dealerCards: Array<Card>;
  setDealerCards: (cards: Array<Card>) => void;
}

export const GameContext = createContext<IGameContext>({
  stateOfGame: "new",
  setStateOfGame: () => {
    // empty function
  },
  cards: [],
  setCards: () => {
    // empty function
  },
  dealerCards: [],
  setDealerCards: () => {
    // empty function
  },
});

export const useGame = () => {
  const {
    stateOfGame,
    setStateOfGame,
    cards,
    setCards,
    dealerCards,
    setDealerCards,
  } = useContext(GameContext);
  return {
    stateOfGame,
    setStateOfGame,
    cards,
    setCards,
    dealerCards,
    setDealerCards,
  };
};

export const GameProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [stateOfGame, setStateOfGame] = useState<GameState | "new">("new");
  const [cards, setCards] = useState<Array<Card>>([]);
  const [dealerCards, setDealerCards] = useState<Array<Card>>([]);

  return (
    <GameContext.Provider
      value={{
        stateOfGame,
        setStateOfGame,
        cards,
        setCards,
        dealerCards,
        setDealerCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
