const Habit = require("../model/Habit")
const request = require('request');
const axios = require("axios")
const schedule = require("node-schedule")


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
        const updatedfreq = await Habit.findByIdAndUpdate(req.params.id, {$set: {Frequency: req.body.Frequency}})
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

// update progress
async function updateProgress(req, res) {
    try {
        const id = req.params.id
        const updatedProg = await Habit.findByIdAndUpdate(req.params.id, {$inc: {Progress: 1}})    
        if (await updatedProg.Progress == updatedProg.Frequency - 1) {
            updating(id)
        }
        res.status(200).json(updatedProg)
    } catch (err) {
        res.status(500).json({err})
    }
}

// updating the streak
async function updating(id) {
    // This updates the streak when frequency meets progress.
    result = await request.patch(`https://track-me-full-stack.herokuapp.com/habits/${id}/streak`)
    // goal is false by default, when frequency is = progress, goal is completed for the day.
    resultComplete = await request.patch(`https://track-me-full-stack.herokuapp.com/habits/${id}/goal`)
}

// Every time at 59 seconds, runs resetProgress
schedule.scheduleJob("59 * * * * *", () => {
    resetProgress()
    console.log("resetted any goals not met")
})

async function resetProgress() {
    // check if goal is true for all habits, if goal is false, reset streak + progress to 0 and goal to false. If goal is true, reset progress + goal/
    // loop through each function
    result = await axios.get("https://track-me-full-stack.herokuapp.com/habits")
    data = result.data
    data.forEach(async habit => {
        const id = habit._id
        if (habit.Goal !== true) {
            const resetStreak = await Habit.findByIdAndUpdate(id, {$set: {Streak: 0}})   
            const resetProgress = await Habit.findByIdAndUpdate(id, {$set: {Progress: 0}})  
        } else {
            const resetProgress = await Habit.findByIdAndUpdate(id, {$set: {Progress: 0}})  
            const resetGoal = await Habit.findByIdAndUpdate(id, {$set: {Goal: false}}) 
        }
    })
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


module.exports = {index, show, create, destroy, updateFreq, updateStreak, updateGoal, updateProgress}
