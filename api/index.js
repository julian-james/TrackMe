const express = require('express'); 
const app = express(); 
// const dotenv = require('dotenv');
app.use(express.json());


const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
//Import Routes


const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

// const authRoute = require('./routes/auth');
// const postRoute = require('./routes/habits')
// app.use('/api/user', authRoute);
// app.use('/api/posts', postRoute);

// dotenv.config();

// Connect to DB
mongoose.connect(
    // process.env.DB_CONNECT.toString(),
    "mongodb+srv://julian:rhino11@cluster0.bdrta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => console.log('connected to db!')
);


// Middleware

//Route Middlewares


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server up and running'));

