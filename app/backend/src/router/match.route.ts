import { Router } from 'express';
import matchController from '../controller/match.controller';

const router = Router();

router.get('/', matchController.getAllMatches);

export default router;
