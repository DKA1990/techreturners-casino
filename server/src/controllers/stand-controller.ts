import { Request, Response } from "express";
import * as gameService from "../services/stand";

export const getStand = async (req: Request, res: Response) => {
  const stand = await gameService.stand();
  if (stand.cards.length > 0 && stand.dealerCards.length > 0) {
    res.json(stand).status(200);
  } else {
    res.status(400).json({"success": false});
  }
};
