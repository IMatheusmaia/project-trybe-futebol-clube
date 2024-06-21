import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import authentication from '../middlewares/auth/authentication';

const router = Router();

router.post('/', loginValidation, authentication);

export default router;
