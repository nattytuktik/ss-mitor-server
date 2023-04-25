import { Router } from 'express';
import auth from '../controllers/auth';
import authToken from '../middlewares/authToken';
const router = Router();

router.post('/registor', auth.registor);

router.post('/login', authToken, auth.login);

export const AuthRouter = router;
