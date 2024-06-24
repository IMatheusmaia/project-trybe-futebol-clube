import { Router } from 'express';
import matchController from '../controller/match.controller';
import authorization from '../middlewares/auth/authorization';
import matchGoalsValidation from '../middlewares/matchGoals.validation';
import matchValidation from '../middlewares/matchValidation';
import matchTeamsValidation from '../middlewares/matchTeamsValidation';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post(
  '/',
  tokenValidation,
  matchValidation,
  matchTeamsValidation,
  matchController.createMatch,
);
router.patch('/:id', authorization, matchGoalsValidation, matchController.updateGoals);
router.patch('/:id/finish', authorization, matchController.updateProgress);

export default router;
