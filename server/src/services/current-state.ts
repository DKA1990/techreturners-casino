import { Card, GameState } from "../types/game-types";

let gameState: GameState;
let deckId: string;
const playerHand: Card[] = [];
const dealerHand: Card[] = [];

export const getGameState = () => {
    return gameState;
};

export const setGameState = (state: GameState) => {
    gameState = state;
};

export const getDeckId = () => {
    return deckId;
};

export const setDeckId = (id: string) => {
    deckId = id;
};

export const getPlayerHand = () => {
    return playerHand;
};

export const setPlayerHand = (card: Card[]) => {
    playerHand.push(...card);
};

export const resetPlayerHand = () => {
    // Actually clears array? Check this!
    playerHand.length = 0;
};

export const getDealerHand = () => {
    return dealerHand;
};

export const setDealerHand = (card: Card[]) => {
    dealerHand.push(...card);
};

export const resetDealerHand = () => {
    dealerHand.length = 0;
};