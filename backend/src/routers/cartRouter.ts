import Router from 'express';
import { authenticate } from '../middlewares/auth.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cart.js';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:foodId', updateCartItem);
router.delete('/:foodId', removeFromCart);
router.delete('/', clearCart);

export default router;
