import express from 'express';
import {
  getAllOrders,
  createOrder,
  confirmPayment,
  confirmPickup,
  cancelOrder
} from '../controllers/Order.js';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.post('/confirm-payment', confirmPayment);
router.post('/confirm-pickup', confirmPickup);
router.post('/cancel', cancelOrder);

export default router;
