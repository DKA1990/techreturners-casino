export type GameState = "INPLAY" | "BUST" | "BLACKJACK" | "STANDING" | "WIN" | "LOSE" | "DRAW";
export type Value =
  | "ACE"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "JACK"
  | "QUEEN"
  | "KING";
export type PointValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface Card {
  value: Value;
  suit: "HEARTS" | "SPADES" | "CLUBS" | "DIAMONDS";
  pointValue: PointValue;
  image: string;
}

export interface StartGameResponse {
  stateOfGame: GameState;
  cards: Array<Card>;
}

export function isSuccessResponse(data: unknown): data is StartGameResponse {
  return (
    data !== undefined &&
    (data as StartGameResponse).stateOfGame !== undefined &&
    (data as StartGameResponse).cards !== undefined
  );
}
