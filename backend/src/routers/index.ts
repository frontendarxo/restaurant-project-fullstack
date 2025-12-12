import Router from 'express';
import foodRouter from './foodRouter.js';
import usersRouter from './users.js';
import cartRouter from './cartRouter.js';
import orderRouter from './orderRouter.js';

const router = Router();

router.use('/foods', foodRouter);
router.use('/users', usersRouter);
router.use('/cart', cartRouter);        
router.use('/orders', orderRouter);

export default router;