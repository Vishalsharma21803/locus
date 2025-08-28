const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:5173'],
  }
));


connectDB();

app.get('/', (req, res) => {
  res.send('Canteen Ordering System API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
