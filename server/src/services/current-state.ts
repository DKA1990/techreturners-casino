import { Card, GameState } from "../types/game-types";

let gameState: GameState;
let deckId: string;
let playerHand: Card[] = [];

export const getGameState = () => {
    return gameState;
}

export const setGameState = (state: GameState) => {
    gameState = state;
}

export const getDeckId = () => {
    return deckId;
}

export const setDeckId = (id: string) => {
    deckId = id;
};

export const getPlayerHand = () => {
    return playerHand;
}

export const setPlayerHand = (card: Card) => {
    playerHand.push(card);
};