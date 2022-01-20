const bodyParser = require('body-parser');
const express = require('express'); 
const app = express(); 
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Added this line to try and overcome terminal error
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors('*'));


//Import Routes
const authRoute = require('./routes/auth');
const habitRoute = require('./routes/habits')

dotenv.config();

// Connect to DB
mongoose.connect(
    // process.env.DB_CONNECT.toString(),
    "mongodb+srv://julian:rhino11@cluster0.bdrta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => console.log('connected to db!')
);


// Middleware


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/habits', habitRoute);

app.get("/", (req, res) => {
    res.send("Hello")
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server up and running'));


module.exports = app;