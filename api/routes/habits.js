const router = require('express').Router();
const { response } = require('express');
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({
    //     habits: {
    //         Nodejs: '',
    //         React: '',
    //         SQL: '',
    //         Python: ''
    //     }
    // });
    res.send(req.user);
    User.findOne({_id: req.user})
});

//READ ROUTE
router.get('/habits', async (req, res) => {
    const habits = await User.find({});

    try {
        res.send(habits);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;