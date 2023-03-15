import { getDeckId } from "./current-state";
import { Card, PointValue } from "../types/game-types";

export async function drawCards(numOfCards: 1 | 2, hand?: Card[]) {
    const drawnCards: Card[] = [];
    let valueTotal: number;
    if (hand) {
        valueTotal = hand.reduce((acc, cur) => acc + cur.pointValue, 0); 
    } else {
        valueTotal = 0;
    }

    const apiDraw = await fetch (`https://deckofcardsapi.com/api/deck/${getDeckId()}/draw/?count=${numOfCards}`);
    const json = await apiDraw.json();
    if (json.success === true) {
        json.cards.forEach((card: Card) => {
            let value: PointValue;

            switch (card.value) {
                case "ACE":
                    (valueTotal + 11) > 21 ? value = 1 : value = 11;
                    break;
                case "KING":
                    value = 10;
                    break;
                case "QUEEN":
                    value = 10;
                    break;
                case "JACK":
                    value = 10;
                    break;
                default:
                    value = parseInt(card.value) as PointValue;
                    break;
            }

            valueTotal = valueTotal + value;

            drawnCards.push({
                value: card.value,
                suit: card.suit,
                pointValue: value,
                image: card.image
            });            
        });
    }
    return drawnCards;
};