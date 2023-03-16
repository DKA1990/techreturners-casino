import { rest } from "msw";
import { setupServer } from "msw/node";
import request from "supertest";
import { app } from "../app";
import * as gameState from "../services/current-state";

const cardServer = setupServer(
  rest.get(
    "https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/",
    (req, res, ctx) => {
      return res(
        ctx.json({
          success: true,
          deck_id: "dvjw5ozpn8h4",
          cards: [
            {
              code: "8H",
              image: "https://deckofcardsapi.com/static/img/8H.png",
              images: {
                svg: "https://deckofcardsapi.com/static/img/8H.svg",
                png: "https://deckofcardsapi.com/static/img/8H.png",
              },
              value: "8",
              suit: "HEARTS",
            },
          ],
          remaining: 49,
        })
      );
    }
  )
);

beforeAll(() => {
  cardServer.listen();
});
afterEach(() => {
  cardServer.resetHandlers();
});
afterAll(() => {
  cardServer.close();
});

test('GET /stand should return json containing the current hand and game state "STANDING"', async () => {
  jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
    return "dvjw5ozpn8h4";
  });

  gameState.resetPlayerHand();

  const res = await request(app).get("/stand");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({
    cards: [],
    stateOfGame: "STANDING",
  });
});
