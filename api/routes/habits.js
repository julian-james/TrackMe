const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        habits: {
            Nodejs: '',
            React: '',
            SQL: '',
            Python: ''
        }
    });
    // res.send(req.user);
    // User.findOne({_id: req.user})
});

module.exports = router;