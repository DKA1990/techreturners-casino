import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import AppButton from "./AppButton";
import '../styles/AppButton.css'


export const StartGameControl: React.FC = () => {
  const { isFetching, error, status, execute } = useFetchData(
    "http://localhost:8080/startgame"
  );

  const handleClick = () => {
    execute();
  };

  return (
    <AppButton onClick={handleClick} disabled={isFetching}>
      Start Game
    </AppButton>
  );
};
