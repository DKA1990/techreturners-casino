import React from "react";
import { Card } from "../types/game-types";

interface HandProps {
  cards: Card[];
}
const calculateTotal = (cards: Card[]) => {
  let total = 0;
  let hasAce = false;
  for (let card of cards) {
    if (card.pointValue === 1) {
      hasAce = true;
    }
    total += card.pointValue;
  }
  if (hasAce && total + 10 <= 21) {
    total += 10;
  }
  return total;
};

const PlayerHand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div>
      {cards.map((card, index) => card.value)}
      <div>Total: {calculateTotal(cards)}</div>
    </div>
  );
};

export default PlayerHand;
