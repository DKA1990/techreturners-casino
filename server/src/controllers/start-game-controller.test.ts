import { rest } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';
import { app } from '../app';

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
    cardServer.listen();
});
afterEach(() => {
    cardServer.resetHandlers();
});
afterAll(() => {
    cardServer.close();
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
        "stateOfGame": "INPLAY"
    });
});