import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
)

app.get('/', (req, res) => res.send('Welcome to the Tech Returners Casino!'));

app.use('/', router);