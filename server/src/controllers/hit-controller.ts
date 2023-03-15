import { Request, Response} from 'express';
import * as hitGameService from '../services/hit';

export const getHit = async (req: Request, res: Response) => {
    const hitCard = await hitGameService.hit();
    res.json(hitCard).status(200);
};