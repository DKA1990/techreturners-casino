import { hasBust } from "./bust";
import { getGameState, getPlayerHand, setGameState } from "./current-state";

export async function stand() {
  hasBust(getPlayerHand()) ? setGameState("BUST") : setGameState("STANDING");
  return {
    cards: getPlayerHand(),
    stateOfGame: getGameState(),
  };
}
