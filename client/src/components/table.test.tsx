import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Table } from "./table";
import { GameProvider } from "../context/game_provider";

export const handlers = [
  rest.get("http://localhost:8080/startgame", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        stateOfGame: "INPLAY",
        cards: [
          {
            value: "ACE",
            suit: "CLUBS",
            pointValue: 11,
            image: "https://deckofcardsapi.com/static/img/AC.png",
          },
          {
            value: "ACE",
            suit: "DIAMONDS",
            pointValue: 1,
            image: "https://deckofcardsapi.com/static/img/AD.png",
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

test("renders a start button when the table is first rendered / the state of game is new", () => {
  render(
    <GameProvider>
      <Table />
    </GameProvider>
  );
  const tableState = screen.getByText("Start Button");
  expect(tableState).toBeInTheDocument();
});

test(`given the start button has been clicked, 
when the fetch call in the return handler has been returned, 
then the cards are displayed`, async () => {
  render(
    <GameProvider>
      <Table />
    </GameProvider>
  );
  const startButton = screen.getByText("Start Button");
  userEvent.click(startButton);
  await waitFor(() => screen.findByText("Cards"));
  expect(screen.getByText("INPLAY")).toBeInTheDocument();
  expect(screen.getAllByText("CLUBS")[0]).toBeInTheDocument();
});
