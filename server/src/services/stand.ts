import { hasBust } from "./bust";
import { getDealerHand, getGameState, getPlayerHand, setGameState } from "./current-state";
import { determineWinner } from "./winner";

export async function stand() {
    hasBust(getPlayerHand()) ? setGameState("BUST") : setGameState("STANDING");
    if (getGameState() !== "BUST") {
        await determineWinner();
    }

    return {
        cards: getPlayerHand(),
        dealerCards: getDealerHand(),
        stateOfGame: getGameState()
    };
}
