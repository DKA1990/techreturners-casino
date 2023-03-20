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

export interface ServerResponse {
  stateOfGame: GameState;
  cards: Array<Card>;
  dealerCards?: Array<Card>;
}

export function isSuccessResponse(data: unknown): data is ServerResponse {
  return (
    data !== undefined &&
    (data as ServerResponse).stateOfGame !== undefined &&
    (data as ServerResponse).cards !== undefined
  );
}
