import { getDealerHand, getDeckId, setDealerHand } from "./current-state";
import { Card, PointValue } from "../types/game-types";
import { hasBust } from "./bust";
import { checkAces } from "./aces-check";

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

// Dealer draws cards if hand value is less than 17
export async function drawDealerCards() {
    let dealerValue = getDealerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
    while (dealerValue < 17) {
        const drawnCard = await drawCards(1, getDealerHand());
        if (drawnCard.length === 0) {
            break;
        }
        setDealerHand(drawnCard);
        if (hasBust(getDealerHand())) {
            checkAces(getDealerHand());
        }
        dealerValue = getDealerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
    }
};