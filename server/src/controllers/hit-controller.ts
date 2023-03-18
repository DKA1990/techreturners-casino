import { Request, Response} from 'express';
import * as hitGameService from '../services/hit';

export const getHit = async (req: Request, res: Response) => {
    const hitCard = await hitGameService.hit();
    if (hitCard.cards.length > 0) {
        res.json(hitCard).status(200);
    } else {
        res.status(400).json({"success": false});
    }
};