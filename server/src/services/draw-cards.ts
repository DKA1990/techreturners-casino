import { getDeckId } from "./current-state";
import { Card, PointValue, Value } from "../types/game-types";

export async function drawCards(numOfCards: 1 | 2) {
    const drawnCards: Card[] = [];
    const apiDraw = await fetch (`https://deckofcardsapi.com/api/deck/${getDeckId()}/draw/?count=${numOfCards}`);
    const json = await apiDraw.json();
    if (json.success === true) {
        json.cards.forEach((card: Card) => {
            const pointValue = (val: Value) : PointValue => {
                switch (val) {
                    case "ACE":
                        return 11;
                    case "KING":
                        return 10;
                    case "QUEEN":
                        return 10;
                    case "JACK":
                        return 10;
                    default:
                        return parseInt(val) as PointValue;
                }
            };
            drawnCards.push({
                value: card.value,
                suit: card.suit,
                pointValue: pointValue(card.value),
                image: card.image
            });            
        });
    }
    return drawnCards;
};