const express = require("express")
const router = express.Router()
const { response } = require('express');
const User = require('../model/User');
const verify = require('./verifyToken');

const habitController = require("../controllers/habit")

router.get("/", habitController.index)
router.get("/:id", habitController.show)
router.post("/", habitController.create)
// router.patch("/:id", habitController.editHabit)
router.patch("/:id/frequency", habitController.updateFreq)
// router.patch("/:id/goal", habitController.updateGoal)
// router.patch("/:id/streak", habitController.updateStreak)
router.delete("/:id", habitController.destroy)


module.exports = router;