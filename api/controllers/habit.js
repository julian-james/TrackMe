const Habit = require("../model/Habit")

// show all habits
async function index(req, res) {
    try {
        await Habit.find()
            .then((result) => res.status(200).json(result))
            .catch((err) => console.log(err))
    } catch (err) {
        console.log("index function not working")
    }
}

// show specific habit
async function show(req, res) {
    try {
        await Habit.findById(req.params.id)
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
        res.status(201).json({message: "added data"})
    } catch(err) {
        console.log("cannot create")
    }
}

// delete a habit
async function destroy(req, res) {
    try {
        const habit = await Habit.findByIdAndRemove(req.params.id, req.body)
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    } catch(err) {
        console.log("cannot destroy")
    }
}

// update frequency
async function updateFreq(req, res) {
    try {
        const updatedfreq = await Habit.findByIdAndUpdate(req.params.id, {$inc: {Frequency: 1}})
        res.status(200).json(updatedfreq)
    } catch (err) {
        res.status(500).json({err})
    }
}

// update streak
async function updateStreak(req, res) {
    try {
        const updatedStreak = await Habit.findByIdAndUpdate(req.params.id, {$inc: {Streak: 1}})
        res.status(200).json(updatedStreak)
    } catch (err) {
        res.status(500).json({err})
    }
}

// update Goal
async function updateGoal(req, res) {
    try {
        const updatedGoal = await Habit.findByIdAndUpdate(req.params.id, {$set: {Goal: true}})
        res.status(200).json(updatedGoal)
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {index, show, create, destroy, updateFreq, updateStreak, updateGoal}

//  updateFreq, updateGoal, updateStreak, createHabit, editHabit, destroy