import React from "react";
import { useGame } from "../context/game_provider";
import AppButton from "./AppButton";

export const EndOfGameControl : React.FC = () => {
  const { stateOfGame, setCards, setStateOfGame, setDealerCards } = useGame();

  const handleClick = () => {
    setCards([]);
    setDealerCards([]);
    setStateOfGame("new");
  };

  return (
    <div>
      <p className="outcome">{`${stateOfGame}!`}</p>
      <AppButton onClick={handleClick}>OK</AppButton>
    </div>
  );
};
