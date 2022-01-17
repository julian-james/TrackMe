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

//CREATE ROUTE
app.post("/habits", async (req, res) => {
    const habit = new User(req.body);
  
    try {
      await habit.save();
      res.send(habit);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//UPDATE ROUTE
app.patch("/habits/:id", async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      await User.save();
      res.send(habit);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.delete("/habits/:id", async (req, res) => {
    try {
      const habit = await User.findByIdAndDelete(req.params.id);
  
      if (!habit) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;