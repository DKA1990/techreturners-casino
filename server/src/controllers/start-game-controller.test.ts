import { rest } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';
import { app } from '../app';
import * as gameState from '../services/current-state';

const cardServer = setupServer(
    rest.get('https://deckofcardsapi.com/api/deck/new/shuffle/', (req, res, ctx) => {
        return res(ctx.json({
            "success": true,
            "deck_id": "dvjw5ozpn8h4",
            "remaining": 52,
            "shuffled": true
        }));
    }),
    rest.get('https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/', (req, res, ctx) => {
        return res(ctx.json({
            "success": true,
            "deck_id": "dvjw5ozpn8h4",
            "cards": [
                {
                    "code": "3C",
                    "image": "https://deckofcardsapi.com/static/img/3C.png",
                    "images": {
                        "svg": "https://deckofcardsapi.com/static/img/3C.svg",
                        "png": "https://deckofcardsapi.com/static/img/3C.png"
                    },
                    "value": "3",
                    "suit": "CLUBS"
                },
                {
                    "code": "8D",
                    "image": "https://deckofcardsapi.com/static/img/8D.png",
                    "images": {
                        "svg": "https://deckofcardsapi.com/static/img/8D.svg",
                        "png": "https://deckofcardsapi.com/static/img/8D.png"
                    },
                    "value": "8",
                    "suit": "DIAMONDS"
                }
            ],
            "remaining": 50
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

test('In the case of GET /startgame failing to return cards, controller should return status code 400', async () => {
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

test('GET /startgame should return json containing two cards and game state "INPLAY"', async () => {
    const res = await request(app).get('/startgame');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
        cards: [
            {
                "value": "3",
                "suit": "CLUBS",
                "pointValue": 3,
                "image": "https://deckofcardsapi.com/static/img/3C.png"
            },
            {
                "value": "8",
                "suit": "DIAMONDS",
                "pointValue": 8,
                "image": "https://deckofcardsapi.com/static/img/8D.png"
            }
        ],
        dealerCards: [
            {
                "value": "3",
                "suit": "CLUBS",
                "pointValue": 3,
                "image": "https://deckofcardsapi.com/static/img/3C.png"
            }
        ],
        "stateOfGame": "INPLAY"
    });
});

test('GET /startgame should return json containing two cards and game state "BLACKJACK"', async () => {
    cardServer.use(
        rest.get('https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/', (req, res, ctx) => {
            return res(ctx.json({
                "success": true,
                "deck_id": "dvjw5ozpn8h4",
                "cards": [
                    {
                        "code": "AC",
                        "image": "https://deckofcardsapi.com/static/img/AC.png",
                        "images": {
                            "svg": "https://deckofcardsapi.com/static/img/AC.svg",
                            "png": "https://deckofcardsapi.com/static/img/AC.png"
                        },
                        "value": "ACE",
                        "suit": "CLUBS"
                    },
                    {
                        "code": "KD",
                        "image": "https://deckofcardsapi.com/static/img/KD.png",
                        "images": {
                            "svg": "https://deckofcardsapi.com/static/img/KD.svg",
                            "png": "https://deckofcardsapi.com/static/img/KD.png"
                        },
                        "value": "KING",
                        "suit": "DIAMONDS"
                    }
                ],
                "remaining": 50
            }));
        })
    );
    
    jest.spyOn(gameState, "getDealerHand").mockImplementation(() => {
        return [
            {
                value: "2",
                suit: "CLUBS",
                pointValue: 2,
                image: "https://deckofcardsapi.com/static/img/2C.png"
            },
            {
                value: "JACK",
                suit: "DIAMONDS",
                pointValue: 10,
                image: "https://deckofcardsapi.com/static/img/JD.png"
            }
        ]
    })

    const res = await request(app).get('/startgame');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
        cards: [
            {
                "value": "ACE",
                "suit": "CLUBS",
                "pointValue": 11,
                "image": "https://deckofcardsapi.com/static/img/AC.png"
            },
            {
                "value": "KING",
                "suit": "DIAMONDS",
                "pointValue": 10,
                "image": "https://deckofcardsapi.com/static/img/KD.png"
            }
        ],
        dealerCards: [
            {
                "value": "2",
                "suit": "CLUBS",
                "pointValue": 2,
                "image": "https://deckofcardsapi.com/static/img/2C.png"
            },
            {
                "value": "JACK",
                "suit": "DIAMONDS",
                "pointValue": 10,
                "image": "https://deckofcardsapi.com/static/img/JD.png"
            }
        ],
        "stateOfGame": "BLACKJACK"
    });
});

test('If GET /startgame returns json containing two cards which are both aces, game state should return "INPLAY"', async () => {
    cardServer.use(
        rest.get('https://deckofcardsapi.com/api/deck/dvjw5ozpn8h4/draw/', (req, res, ctx) => {
            return res(ctx.json({
                "success": true,
                "deck_id": "dvjw5ozpn8h4",
                "cards": [
                    {
                        "code": "AC",
                        "image": "https://deckofcardsapi.com/static/img/AC.png",
                        "images": {
                            "svg": "https://deckofcardsapi.com/static/img/AC.svg",
                            "png": "https://deckofcardsapi.com/static/img/AC.png"
                        },
                        "value": "ACE",
                        "suit": "CLUBS"
                    },
                    {
                        "code": "AD",
                        "image": "https://deckofcardsapi.com/static/img/AD.png",
                        "images": {
                            "svg": "https://deckofcardsapi.com/static/img/AD.svg",
                            "png": "https://deckofcardsapi.com/static/img/AD.png"
                        },
                        "value": "ACE",
                        "suit": "DIAMONDS"
                    }
                ],
                "remaining": 50
            }));
        })
    );

    jest.spyOn(gameState, "getDealerHand").mockImplementation(() => {
        return [
            {
                value: "2",
                suit: "CLUBS",
                pointValue: 2,
                image: "https://deckofcardsapi.com/static/img/2C.png"
            },
            {
                value: "JACK",
                suit: "DIAMONDS",
                pointValue: 10,
                image: "https://deckofcardsapi.com/static/img/JD.png"
            }
        ]
    })

    const res = await request(app).get('/startgame');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
        cards: [
            {
                "value": "ACE",
                "suit": "CLUBS",
                "pointValue": 11,
                "image": "https://deckofcardsapi.com/static/img/AC.png"
            },
            {
                "value": "ACE",
                "suit": "DIAMONDS",
                "pointValue": 1,
                "image": "https://deckofcardsapi.com/static/img/AD.png"
            }
        ],
        dealerCards: [
            {
                "value": "2",
                "suit": "CLUBS",
                "pointValue": 2,
                "image": "https://deckofcardsapi.com/static/img/2C.png"
            }
        ],
        "stateOfGame": "INPLAY"
    });
});