import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './utils/db.js';
import cron from 'node-cron';
import Order from './models/Order.js';
import MenuItem from './models/Product.js';
import mongoose from 'mongoose';
import userRoutes from './routes/User.js';
import productRoutes from './routes/Product.js';

import orderRoutes from './routes/Order.js';

import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();


app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('Canteen Ordering System API');
});

app.use(
  cors({
      origin: ["http://localhost:5173", "http://localhost:5000"], 
      credentials: true,
  })
);

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const staleOrders = await Order.find({ status: 'pending', expiresAt: { $lt: now } }).session(session);
    for (const order of staleOrders) {
      for (const item of order.items) {
        const menuItem = await MenuItem.findById(item.itemId).session(session);
        if (menuItem) {
          menuItem.stock += item.quantity;
          await menuItem.save({ session });
        }
      }
      order.status = 'cancelled';
      order.cancelledAt = new Date();
      await order.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
    if (staleOrders.length > 0) {
      console.log(`Auto-cancelled ${staleOrders.length} stale orders.`);
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error in auto-cancel cron job:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
