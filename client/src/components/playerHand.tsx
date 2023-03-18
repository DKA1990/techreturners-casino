import React from "react";
import { Card } from "../types/game-types";
import { useGame } from "../context/game_provider";
import DisplayCard from "./DisplayCard";

const calculateTotal = (cards: Card[]) => {
  let total = 0;

  for (const card of cards) {
    total += card.pointValue;
  }
  return total;
};

const PlayerHand: React.FC = () => {
  const { cards } = useGame();
  return (
    <div>
      {cards.map((card) => (
        <DisplayCard card={card} />
      ))}
      <div>Player Hand Total: {calculateTotal(cards)}</div>
    </div>
  );
};

export default PlayerHand;
