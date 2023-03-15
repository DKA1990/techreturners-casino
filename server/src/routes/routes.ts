import express from "express";
import * as startGameController from '../controllers/start-game-controller';
import * as hitController from '../controllers/hit-controller';

export const router = express.Router();

router.get('/startgame', startGameController.getStart);

router.get('/hit', hitController.getHit);