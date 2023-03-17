import React from 'react';
import { Card } from '../types/game-types';

interface CardProps {
    card: Card;
  }
  const DisplayCard: React.FC<CardProps> = ({ card }) => {
    return <img src={card.image} />;
  };
  export default DisplayCard;