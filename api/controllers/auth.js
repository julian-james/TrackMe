// const router = require('express').Router();

const User = require('../model/User');

const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

async function registerUser(req, res) {

    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    // const validation = schema.validate(req.body)
    // res.send(validation);

    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
};

//LOGIN
async function loginUser (req, res) {
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email is not found');
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    res.send('Logged in!');

    // //Create and assign a token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);
};

module.exports = { registerUser, loginUser};