// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());



connectDB();

app.get('/', (req, res) => {
  res.send('Canteen Ordering System API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
