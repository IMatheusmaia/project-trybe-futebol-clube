import { Router } from 'express';
import matchController from '../controller/match.controller';
import authorization from '../middlewares/auth/authorization';
import matchGoalsValidation from '../middlewares/matchGoals.validation';

const router = Router();

router.get('/', matchController.getAllMatches);
router.patch('/:id', authorization, matchGoalsValidation, matchController.updateGoals);
router.patch('/:id/finish', authorization, matchController.updateProgress);

export default router;
