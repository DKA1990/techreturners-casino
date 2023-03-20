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
      {cards.length < 1 && <div className="empty-card"></div>}
      {cards.length >= 1 && <p>Cards</p>}
      {cards.map((card) => (
        <DisplayCard key={card.value + card.suit} card={card} />
      ))}
      <h2>Player Hand Total: {calculateTotal(cards)}</h2>
    </div>
  );
};

export default PlayerHand;
