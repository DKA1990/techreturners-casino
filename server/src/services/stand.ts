import { hasBust } from "./bust";
import { getDealerHand, getGameState, getPlayerHand, setGameState } from "./current-state";
import { drawDealerCards } from "./draw-cards";

export async function stand() {
    hasBust(getPlayerHand()) ? setGameState("BUST") : setGameState("STANDING");
    if (getGameState() !== "BUST") {
        await drawDealerCards();
        const playerValue = getPlayerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
        const dealerValue = getDealerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
        (playerValue > dealerValue) ? setGameState("WIN") : 
            (playerValue < dealerValue) ? setGameState("LOSE") : setGameState("DRAW");
    }

    return {
        cards: getPlayerHand(),
        stateOfGame: getGameState(),
        dealerCards: getDealerHand()
    };
}
