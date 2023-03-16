import React from "react";
import { useGame } from "../context/game_provider";
import { Controls } from "./controls";

export const Table: React.FC = () => {
  const { stateOfGame, cards } = useGame();

  console.log(`stateGame is ${stateOfGame}`);

  return (
    <main className="table">
      <Controls />
      {/** The following code is placeholder and needs to be refactored into a hand component */}
      {/** TO DO: loading and error states to be considered */}
      <div>
        <p>{stateOfGame}</p>
        {cards.length >= 1 && <p>Cards</p>}
        {cards.map((card, index) => (
          <p key={index}>{card.suit}</p>
        ))}
      </div>
    </main>
  );
};
