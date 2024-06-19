import { Router } from 'express';
import teamController from '../controller/team.controller';

const router = Router();

router.get('/', teamController.getAllTeams);

export default router;
