import { Card } from "../types/game-types";

export function hasBlackjack (hand: Card[]) : boolean {
    let blackjack = false;
    if (hand.length === 2) {
        hand.reduce((acc, cur) => acc + cur.pointValue, 0) === 21 ? blackjack = true : blackjack = false;
    }
    return blackjack;
};