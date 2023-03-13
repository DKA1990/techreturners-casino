import request from 'supertest';
import { app } from '../app';

describe('Test default API endpoint request', () => {
    test('When given base endpoint, GET should return correct message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Welcome to the Tech Returners Casino!');
    });
});