import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { GameProvider } from "../context/game_provider";
import { Table } from "./table";
import userEvent from "@testing-library/user-event";

export const handlers = [
  rest.get("http://localhost:8080/startgame", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        stateOfGame: "BLACKJACK",
        cards: [
          {
            value: "ACE",
            suit: "CLUBS",
            pointValue: 11,
            image: "https://deckofcardsapi.com/static/img/AC.png",
          },
          {
            value: "KING",
            suit: "DIAMONDS",
            pointValue: 10,
            image: "https://deckofcardsapi.com/static/img/KD.png",
          },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders BLACKJACK report when game state is reported as such", async () => {
  render(
    <GameProvider>
      <Table />
    </GameProvider>
  );
  userEvent.click(screen.getByText("Start Game"));
  await waitFor(() => screen.findByText("Player Hand"));
  expect(screen.getByText("BLACKJACK!")).toBeInTheDocument();
});
