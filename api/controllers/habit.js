const Habit = require("../model/Habit")

async function index(req, res) {
    try {
        Habit.find()
            .then((result) => res.status(200).json(result))
            .catch((err) => console.log(err))
    } catch (err) {
        console.log("index function not working")
    }
}

async function show(req, res) {
    try {
        Habit.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    } catch (err) {
        console.log("can't find the id")
    }
}

// async function updateFreq(req, res) {
//     try {

//     }
// }
module.exports = {index, show}

//  updateFreq, updateGoal, updateStreak, createHabit, editHabit, destroy