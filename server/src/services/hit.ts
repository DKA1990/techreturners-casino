import { hasBust } from "./bust";
import { getGameState, getPlayerHand, setGameState, setPlayerHand } from "./current-state";
import { drawCards } from "./draw-cards";

export async function hit() {
    const drawnCard = await drawCards(1, getPlayerHand());
    setPlayerHand(drawnCard);
    hasBust(getPlayerHand()) ? setGameState("BUST") : setGameState("INPLAY");
    return {
        cards: getPlayerHand(),
        stateOfGame: getGameState()
    }
}