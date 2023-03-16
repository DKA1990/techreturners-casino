import { Request, Response } from "express";
import * as gameService from "../services/stand";

export const getStand = async (req: Request, res: Response) => {
  const stand = await gameService.stand();
  res.json(stand).status(200);
};
