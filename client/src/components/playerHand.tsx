import React from "react";
import { Card } from "../types/game-types";

interface HandProps {
  cards: Card[];
}

const PlayerHand: React.FC<HandProps> = ({ cards }) => {
  return <div>{cards.map((card, index) => card.pointValue)}</div>;
};

export default PlayerHand;
