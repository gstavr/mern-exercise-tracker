const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Execute on Backend Path nodemon server
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully`);
});

//Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
