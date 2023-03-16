import React from "react";
import { useGame } from "../context/game_provider";
import AppButton from "./AppButton";

export const BustControl: React.FC = () => {
  const { setCards, setStateOfGame } = useGame();

  const handleClick = () => {
    setCards([]);
    setStateOfGame("new");
  };

  return (
    <div>
      <p>BUST!</p>
      <AppButton onClick={handleClick}>OK</AppButton>
    </div>
  );
};
