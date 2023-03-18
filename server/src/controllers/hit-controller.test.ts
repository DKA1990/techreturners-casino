import { rest } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';
import { app } from '../app';
import * as gameState from '../services/current-state';

const cardServer = setupServer(    
    rest.get('https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/', (req, res, ctx) => {
        return res(ctx.json({
            "success": true,
            "deck_id": "dvjw5ozpn8h4",
            "cards": [
                {
                    "code": "8H",
                    "image": "https://deckofcardsapi.com/static/img/8H.png",
                    "images": {
                        "svg": "https://deckofcardsapi.com/static/img/8H.svg",
                        "png": "https://deckofcardsapi.com/static/img/8H.png"
                    },
                    "value": "8",
                    "suit": "HEARTS"
                }
            ],
            "remaining": 49
        }));
    })
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

test('In the case of GET /hit failing to return cards, controller should return status code 400', async () => {
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

test('GET /hit on an empty hand should return json containing one card and game state "INPLAY"', async () => {
    jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
        return "dvjw5ozpn8h4";
    });

    gameState.resetPlayerHand();
    gameState.resetDealerHand();

    const res = await request(app).get('/hit');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
        "cards": [            
            {
                "value": "8",
                "suit": "HEARTS",
                "pointValue": 8,
                "image": "https://deckofcardsapi.com/static/img/8H.png"
            }
        ],
        "stateOfGame": "INPLAY"
    });
});

test('GET /hit should return json containing the full hand of cards and game state "BUST" when hand total is over 21', async () => {
    jest.spyOn(gameState, "getDeckId").mockImplementation(() => {
        return "dvjw5ozpn8h4";
    });

    gameState.resetPlayerHand();
    gameState.resetDealerHand();
    gameState.setPlayerHand([
        {
            value: 'KING',
            suit: "HEARTS",
            pointValue: 10,
            image: "https://deckofcardsapi.com/static/img/KH.png"
        },
        {
            value: 'KING',
            suit: "CLUBS",
            pointValue: 10,
            image: "https://deckofcardsapi.com/static/img/KC.png"
        }
    ]);

    const res = await request(app).get('/hit');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
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
    });
});