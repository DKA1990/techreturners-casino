import React from "react";
import { useGame } from "../context/game_provider";
import { Controls } from "./controls";
import { DealerHand } from "./dealerHand";
import DisplayCard from "./DisplayCard";

export const Table: React.FC = () => {
  const { stateOfGame, cards, dealerCards } = useGame();

  console.log(`stateGame is ${stateOfGame}`);

  return (
    <main className="table">
      <DealerHand />
      <Controls />
      {/** The following code is placeholder and needs to be refactored into a hand component */}
      {/** TO DO: loading and error states to be considered */}
      <div>
        {cards.length >= 1 && <p>Cards</p>}
        {cards.map((card, index) => (
          <DisplayCard key={index} card={card} />
        ))}
      </div>
    </main>
  );
};
