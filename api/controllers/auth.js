// const router = require('express').Router();
require('dotenv').config();
const User = require('../model/User');

const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET = "secret" } = process.env;

// const { registerValidation, loginValidation } = require('../validation');

async function registerUser2(req, res) {
    // Check to make sure the email provided is not registered
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            // Throw a 400 error if the email address already exists
            return res
                .status(400)
                .json({ email: "A user has already registered with this address" });
        } else {
            // Otherwise create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // newUser.save()
            // return res.status(200).json({msg: newUser})

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));

                    return res.status(200).json({ msg: newUser });
                });
            });
        }
    });
    




    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    // const validation = schema.validate(req.body)
    // res.send(validation);

    // const {error} = registerValidation(req.body)
    // if (error) return res.status(400).send(error.details[0].message);

    //Checking if user is already in the database
    // const emailExist = await User.findOne({email: req.body.email});
    // if (emailExist) return res.status(400).send('Email already exists');

    // //Hash passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // //Create a new user
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    // });
    // try {
    //     const savedUser = await user.save();
    //     res.send({user: user._id});
    // } catch (err) {
    //     res.status(400).send(err);
    // }
};



async function registerUser(req, res) {
    try {
        const { name, email, password/*, passwordCheck*/ } = req.body;
    
        // validate
        // status code 400 means bad request
        // status code 500 means internal server error
    
        if (!name || !email || !password /*|| !passwordCheck*/) {
          return res.status(400).json({ msg: "Not all fields have been entered" });
        }
    
        // Checking to ensure password length is at least 5 characters
        if (password.length < 5) {
          return res
            .status(400)
            .json({ msg: "The password needs to be at least 5 characters long" });
        }
    
        // // Checking the password entered vs the password checker
        // if (password !== passwordCheck) {
        //   return res
        //     .status(400)
        //     .json({ msg: "Passwords do not match. Please try again" });
        // }
    
        // Checking database and running an email check to ensure no duplicate emails upon register 
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists" });
        }
    
        // using Bcrypt to hash passwords for security
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
    
        // creating out new user notice password value is passwordHash not password
        const newUser = new User({
            name: name,
            email: email,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    
        // Catching any errors that come through
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
}







//LOGIN
async function loginUser (req, res) {
    // try {
    //     // check if the user exists
    //     const user = await User.findOne({ username: req.body.username });
    //     if (user) {
    //       //check if password matches
    //       const result = await bcrypt.compare(req.body.password, user.password);
    //       if (result) {
    //         // sign token and send it in response
    //         const token = await jwt.sign({ username: user.username }, SECRET);
    //         res.json({ token });
    //       } else {
    //         res.status(400).json({ error: "password doesn't match" });
    //       }
    //     } else {
    //       res.status(400).json({ error: "User doesn't exist" });
    //     }
    //   } catch (error) {
    //     res.status(400).json({ error });
    //   }


    




    // // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // Checking if email exists
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