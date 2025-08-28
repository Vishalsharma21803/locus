import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './utils/db.js';
import userRoutes from './routes/User.js';
import productRoutes from './routes/Product.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());



connectDB();

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

app.get('/', (req, res) => {
  res.send('Canteen Ordering System API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
