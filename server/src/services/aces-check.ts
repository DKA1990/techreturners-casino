import { Card } from "../types/game-types";

export function checkAces(hand: Card[]) {
    // Find first ace with value of 11
    const aceIndex = hand.findIndex((card) => {
        if (card.value === "ACE" && card.pointValue === 11) {
            return true
        }
    });
    // If found, replace pointValue with 1
    if (aceIndex !== -1) {
        hand[aceIndex].pointValue = 1;
    }
}