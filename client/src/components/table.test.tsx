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
  rest.get("http://localhost:8080/hit", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "cards": [
            {
                "value": 'KING',
                "suit": "HEARTS",
                "pointValue": 10,
                "image": "https://deckofcardsapi.com/static/img/KH.png"
            },
            {
                "value": 'KING',
                "suit": "CLUBS",
                "pointValue": 10,
                "image": "https://deckofcardsapi.com/static/img/KC.png"
            },
            {
                "value": "8",
                "suit": "HEARTS",
                "pointValue": 8,
                "image": "https://deckofcardsapi.com/static/img/8H.png"
            }
        ],
        "stateOfGame": "BUST"
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
  const tableState = screen.getByText("Start Game");
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
  const startButton = screen.getByText("Start Game");
  userEvent.click(startButton);
  await waitFor(() => screen.findByText("Player Hand"));
  expect(screen.getAllByAltText(/CLUBS/i)[0]).toBeInTheDocument();
});

test(`given the game is INPLAY, 
when the hit button is pressed, 
then the updated cards and stateOfGame are displayed`, async () => {
  render(
    <GameProvider>
      <Table />
    </GameProvider>
  );
  const startButton = screen.getByText("Start Game");
  userEvent.click(startButton);
  await waitFor(() => screen.findByText("Player Hand"));
  const hitButton = screen.getByText("Hit");
  userEvent.click(hitButton);
  await waitFor(() => screen.findAllByAltText(/HEARTS/i));
  expect(screen.getByText("BUST!")).toBeInTheDocument();
  expect(screen.getAllByAltText(/HEARTS/i)[0]).toBeInTheDocument();
});

test(`given the game has pressed HIT, 
when the result is BUST, 
then BUST is displayed to the user and a button which resets the table is shown`, async () => {
  render(
    <GameProvider>
      <Table />
    </GameProvider>
  );
  const startButton = screen.getByText("Start Game");
  userEvent.click(startButton);
  await waitFor(() => screen.findByText("Player Hand"));
  const hitButton = screen.getByText("Hit");
  userEvent.click(hitButton);
  await waitFor(() => screen.findAllByAltText(/HEARTS/i));
  expect(screen.getByText("BUST!")).toBeInTheDocument();
  const reset = screen.getByText("OK");
  userEvent.click(reset);
  expect(screen.getByText("Start Game")).toBeInTheDocument();
});
