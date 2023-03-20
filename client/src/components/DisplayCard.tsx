import React from 'react';
import { Card } from '../types/game-types';

interface CardProps {
    card: Card;
  }
  const DisplayCard: React.FC<CardProps> = ({ card }) => {
    return <img className="card" src={card.image} alt={`${card.value} ${card.suit}`} />;
  };
  export default DisplayCard;