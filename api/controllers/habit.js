const Habit = require("../model/Habit")

// show all habits
async function index(req, res) {
    try {
        Habit.find()
            .then((result) => res.status(200).json(result))
            .catch((err) => console.log(err))
    } catch (err) {
        console.log("index function not working")
    }
}

// show specific habit
async function show(req, res) {
    try {
        Habit.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    } catch (err) {
        console.log("can't find the id")
    }
}

// create a new habit
async function create(req, res) {
    try {
        let item = req.body
        let data = await new Habit(item)
        data.save() 
        res.status(201).json({message: "message"})
    } catch(err) {
        console.log("cannot create")
    }
}

// async function updateFreq(req, res) {
//     try {

//     }
// }
module.exports = {index, show, create}

//  updateFreq, updateGoal, updateStreak, createHabit, editHabit, destroy