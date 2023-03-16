import React from 'react';
import { useGame } from "../context/game_provider";
import { useFetchData } from "../hooks/useFetchData";
import {
  GameState,
  isSuccessResponse,
  Card,
} from "../types/game-types";
import AppButton from './AppButton';

export const StartGameControl : React.FC = () => {
    const { stateOfGame, setStateOfGame, cards, setCards } = useGame();

    const { data, isFetching, error, status, execute } = useFetchData("http://localhost:8080/startgame");

    const handleClick = () => {
      execute();
    };
  
    const newStateOfGame: GameState | "new" = isSuccessResponse(data)
    ? data.stateOfGame
    : "new";
  
    console.log(newStateOfGame);

  
    const newCards: Array<Card> | undefined = isSuccessResponse(data)
      ? data.cards
      : undefined;
  
    console.log(newCards);

    if(newStateOfGame !== "new" && newCards !== undefined) {
        setStateOfGame(newStateOfGame);
        setCards(newCards);
        console.log("set states");
    }

    return (
        <AppButton onClick={handleClick}>Start Game</AppButton>
    )
}