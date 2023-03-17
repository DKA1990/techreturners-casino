import React from "react";
import { useGame } from "../context/game_provider";
import { GameState } from "../types/game-types";
import AppButton from "./AppButton";

const StandControl: React.FC = () => {
  const { stateOfGame, setStateOfGame } = useGame();

  const handleStandClick = () => {
    const newStateOfGame: GameState = "STANDING";
    setStateOfGame(newStateOfGame);
    console.log(newStateOfGame);
  };

  return (
    <div>
      <AppButton onClick={handleStandClick}>Stand</AppButton>
    </div>
  );
};
export default StandControl;
