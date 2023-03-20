import { checkAces } from "./aces-check";
import { hasBust } from "./bust";
import { getGameState, getPlayerHand, setGameState, setPlayerHand } from "./current-state";
import { drawCards } from "./draw-cards";

export async function hit() {
    const drawnCard = await drawCards(1, getPlayerHand());
    setPlayerHand(drawnCard);
    // If player busts, check for existing aces in hand with a value of 11 and change value of one of them to 1
    if (hasBust(getPlayerHand())) {
        checkAces(getPlayerHand());
    }
    hasBust(getPlayerHand()) ? setGameState("BUST") : setGameState("INPLAY");
    return {
        cards: getPlayerHand(),
        stateOfGame: getGameState()
    }
}