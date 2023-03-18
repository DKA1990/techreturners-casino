import { getDealerHand, getPlayerHand, setGameState } from "./current-state";
import { drawDealerCards } from "./draw-cards";

export async function determineWinner() {
    await drawDealerCards();
        const playerValue = getPlayerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
        const dealerValue = getDealerHand().reduce((acc, cur) => acc + cur.pointValue, 0);
        (dealerValue > 21) ? setGameState("WIN") :
            (playerValue > dealerValue) ? setGameState("WIN") : 
                (playerValue < dealerValue) ? setGameState("LOSE") : setGameState("DRAW");
}