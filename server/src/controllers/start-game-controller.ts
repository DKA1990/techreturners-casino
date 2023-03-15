import { Request, Response} from 'express';
import * as startGameService from '../services/start-game';

export const getStart = async (req: Request, res: Response) => {
    const initialState = await startGameService.startGame();
    res.json(initialState).status(200);
};