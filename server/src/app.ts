import express from 'express';

export const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the Tech Returners Casino!'));