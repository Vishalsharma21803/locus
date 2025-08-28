import express from 'express';
import {
  getAllOrders,
  createOrder,
  confirmPayment,
  confirmPickup,
  cancelOrder
} from '../controllers/Order.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, getAllOrders);
router.post('/', authenticate, createOrder);
router.post('/confirm-payment', authenticate, confirmPayment);
router.post('/confirm-pickup', authenticate, confirmPickup);
router.post('/cancel', authenticate, cancelOrder);

export default router;
