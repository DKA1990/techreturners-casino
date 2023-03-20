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
      {cards.length > 1 && <p>Player Hand</p>}
      {cards.length < 1 && 
        <>
          <img alt="face down card" src={require("../images/back_of_card.png")} className="card" />
          <img alt="face down card" src={require("../images/back_of_card.png")} className="card" />
        </>
      }
      {cards.map((card) => (
        <DisplayCard key={card.value + card.suit} card={card} />
      ))}
      <h2>Player Hand Total: {calculateTotal(cards)}</h2>
    </div>
  );
};

export default PlayerHand;
