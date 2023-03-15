import express from "express";
import * as startGameController from '../controllers/start-game-controller';

export const router = express.Router();
router.get('/startgame', startGameController.getStart);