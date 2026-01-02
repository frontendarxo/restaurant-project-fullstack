import Router from 'express';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../controllers/user.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logoutUser);

export default router;