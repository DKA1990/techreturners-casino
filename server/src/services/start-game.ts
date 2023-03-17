import { setDeckId, setGameState, getPlayerHand, setPlayerHand, getGameState, resetPlayerHand, getDealerHand, setDealerHand, resetDealerHand } from "./current-state";
import { drawCards } from "./draw-cards";
import { hasBlackjack } from "./blackjack";
import { Card } from "../types/game-types";

export async function startGame() {
    resetPlayerHand();
    resetDealerHand();
    const apiStart = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const json = await apiStart.json();
    if (json.success === true) {
        setDeckId(json.deck_id);
        setPlayerHand(await drawCards(2));
        setDealerHand(await drawCards(2));
        hasBlackjack(getPlayerHand()) ? (hasBlackjack(getDealerHand()) ? setGameState("DRAW") : setGameState("BLACKJACK")) : setGameState("INPLAY");
    };
    let dealerCards: Card[] = [];
    if (getGameState() === "DRAW" || getGameState() === "BLACKJACK") {
        dealerCards = getDealerHand();
    } else {
        dealerCards = [getDealerHand()[0]];
    }
    return {
        cards: getPlayerHand(),
        dealerCards: dealerCards,
        stateOfGame: getGameState()
    }
};