import { setDeckId, setGameState, getPlayerHand, getGameState, resetPlayerHand } from "./current-state";
import { drawCards } from "./draw-cards";
import { hasBlackjack } from "./blackjack";

export async function startGame() {
    resetPlayerHand();
    const apiStart = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const json = await apiStart.json();
    if (json.success === true) {
        setDeckId(json.deck_id);
        await drawCards(2);
        hasBlackjack(getPlayerHand()) ? setGameState("BLACKJACK") : setGameState("INPLAY");
    };
    return {
        cards: getPlayerHand(),
        stateOfGame: getGameState()
    }
};