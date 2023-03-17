import { Request, Response} from 'express';
import * as startGameService from '../services/start-game';

export const getStart = async (req: Request, res: Response) => {
    const initialState = await startGameService.startGame();
    if (initialState.cards.length > 0 && initialState.dealerCards.length > 0) {
        res.json(initialState).status(200);
    } else {
        res.status(400).json({"success": false});
    }
};