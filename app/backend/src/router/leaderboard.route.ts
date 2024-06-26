import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.controller';

const router = Router();

router.get('/home', leaderboardController.listLeaderTeams);

export default router;
