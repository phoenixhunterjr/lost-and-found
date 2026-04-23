const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔥 FORCE CORS (guaranteed fix)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// also keep cors middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 8000, () =>
      console.log('Server running on port 8000')
    );
  })
  .catch(err => console.log(err));