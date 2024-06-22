import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import authentication from '../middlewares/auth/authentication';
import authorization from '../middlewares/auth/authorization';

const router = Router();

router.post('/', loginValidation, authentication);
router.get('/role', authorization);

export default router;
