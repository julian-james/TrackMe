const express = require('express');
const app = express();
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/habits')

// dotenv.config();

// Connect to DB
mongoose.connect(
    // process.env.DB_CONNECT.toString(),
    "mongodb+srv://julian:rhino11@cluster0.bdrta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => console.log('connected to db!')
);

// Middleware
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server up and running'));