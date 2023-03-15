import { Card } from "../types/game-types";

export function hasBust(hand: Card[]) : boolean {
    let bust = false;
    hand.reduce((acc, cur) => acc + cur.pointValue, 0) > 21 ? bust = true : bust = false;
    return bust;
}