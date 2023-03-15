import React, { useState, useEffect } from "react";
import { useGame } from "../context/game_provider";
import { NewGame } from "./newGame";

export const Table: React.FC = () => {
  const { stateOfGame, setStateOfGame, cards, setCards } = useGame();

  console.log(`stateGame is ${stateOfGame}`);

  return (
    <main className="table">
      {stateOfGame === "new" ? (
        <NewGame />
      ) : (
        <div>
          <p>Cards</p>
          <p>{stateOfGame}</p>
          <p>{cards && cards[0].suit}</p>
        </div>
      )}
    </main>
  );
};
