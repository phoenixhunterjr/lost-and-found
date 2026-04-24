const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Proper CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://lost-and-found-2-cp7t.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 8000, () => {
      console.log('Server running on port 8000');
    });
  })
  .catch(err => console.log(err));