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
  cardServer.listen({ onUnhandledRequest: "bypass" });
});
afterEach(() => {
  cardServer.resetHandlers();
});
afterAll(() => {
  cardServer.close();
});

test('In the case of GET /stand failing to return cards, controller should return status code 400', async () => {
  jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
      return "dvjw5ozpn8h4";
  });

  cardServer.use(
      rest.get('https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/', (req, res, ctx) => {
          return res(ctx.json({
              "success": false
          }), ctx.status(400));
      })
  )

  gameState.resetPlayerHand();
  gameState.resetDealerHand();

  const res = await request(app).get('/hit');

  expect(res.statusCode).toEqual(400);
  expect(res.body).toEqual({
      success: false
  });
});

test('GET /stand should return json containing the current hand and game state "WIN" when dealer draws cards to bust', async () => {
  jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
    return "dvjw5ozpn8h4";
  });

  jest.spyOn(gameState, "getPlayerHand").mockImplementation(() => {
    return [
      {
        value: "8",
        suit: "HEARTS",
        pointValue: 8,
        image: "https://deckofcardsapi.com/static/img/8H.png"
      },
      {
        value: "3",
        suit: "CLUBS",
        pointValue: 3,
        image: "https://deckofcardsapi.com/static/img/3C.png"
      } 
    ]
  });

  gameState.resetPlayerHand();

  const res = await request(app).get("/stand");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({
    cards: [
      {
        value: "8",
        suit: "HEARTS",
        pointValue: 8,
        image: "https://deckofcardsapi.com/static/img/8H.png"
      },
      {
        value: "3",
        suit: "CLUBS",
        pointValue: 3,
        image: "https://deckofcardsapi.com/static/img/3C.png"
      }
    ],
    dealerCards: [
      {
        value: "8",
        suit: "HEARTS",
        pointValue: 8,
        image: "https://deckofcardsapi.com/static/img/8H.png"
      },
      {
        value: "8",
        suit: "HEARTS",
        pointValue: 8,
        image: "https://deckofcardsapi.com/static/img/8H.png"
      },
      {
        value: "8",
        suit: "HEARTS",
        pointValue: 8,
        image: "https://deckofcardsapi.com/static/img/8H.png"
      }
    ],
    stateOfGame: "WIN",
  });
});

test('GET /stand should return json containing the current hand and game state "WIN" when player wins', async () => {
  jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
    return "dvjw5ozpn8h4";
  });

  jest.spyOn(gameState, "getPlayerHand").mockImplementation(() => {
    return [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }   
    ]
  });

  jest.spyOn(gameState, "getDealerHand").mockImplementation(() => {
    return [
      {
        value: "JACK",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/JH.png"
      },
      {
        value: "KING",
        suit: "DIAMONDS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/KD.png"
      } 
    ]
  });

  gameState.resetPlayerHand();

  const res = await request(app).get("/stand");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({
    cards: [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }
    ],
    dealerCards: [
      {
        value: "JACK",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/JH.png"
      },
      {
        value: "KING",
        suit: "DIAMONDS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/KD.png"
      }
    ],
    stateOfGame: "WIN",
  });
});

test('GET /stand should return json containing the current hand and game state "DRAW" when game is a draw', async () => {
  jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
    return "dvjw5ozpn8h4";
  });

  jest.spyOn(gameState, "getPlayerHand").mockImplementation(() => {
    return [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }   
    ]
  });

  jest.spyOn(gameState, "getDealerHand").mockImplementation(() => {
    return [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }
    ]
  });

  gameState.resetPlayerHand();

  const res = await request(app).get("/stand");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({
    cards: [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }
    ],
    dealerCards: [
      {
        value: "10",
        suit: "HEARTS",
        pointValue: 10,
        image: "https://deckofcardsapi.com/static/img/10H.png"
      },
      {
        value: "9",
        suit: "CLUBS",
        pointValue: 9,
        image: "https://deckofcardsapi.com/static/img/9C.png"
      },
      {
        value: "2",
        suit: "CLUBS",
        pointValue: 2,
        image: "https://deckofcardsapi.com/static/img/2C.png"
      }
    ],
    stateOfGame: "DRAW",
  });
});
