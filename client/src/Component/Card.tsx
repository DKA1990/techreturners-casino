import React from 'react';
import './Card.css';

type CardProps = {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';
  isHidden?: boolean;
};

const Card: React.FC<CardProps> = ({ suit, rank, isHidden }) => {
  const getCardValue = (): number => {
    if (rank === 'ace') {
      return 11;
    } else if (['jack', 'queen', 'king'].includes(rank)) {
      return 10;
    } else {
      return parseInt(rank);
    }
  };

  const getCardColor = (): string => {
    if (suit === 'hearts' || suit === 'diamonds') {
      return 'red';
    } else {
      return 'black';
    }
  };

  const cardValue = getCardValue();
  const cardColor = getCardColor();

  return (
    <div className={`card ${cardColor} ${isHidden ? 'hidden' : ''}`}>
      <div className="card-value">{isHidden ? '?' : rank}</div>
      <div className="card-suit">
        <img src={`/images/${suit}.svg`} alt={suit} />
      </div>
      <div className="card-value">{isHidden ? '?' : rank}</div>
    </div>
  );
};

export default Card;
