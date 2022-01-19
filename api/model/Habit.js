const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    HabitName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    Frequency: {
        type: Number,
        required: true
    },
    Goal: {
        type: Boolean,
        default: false
    },
    Streak: {
        type: Number,
        default: 0
    },
    Progress: {
        type: Number,
        default: 0
    },
    
}, {collection: "habits"});

// everytime done is clicked, increments progress and when prog is = to freq , add 1 to streak, and have a variable "completed today" and set to true and after 24hr, reset prog to 0 and if completed today = false, set streak to 0.
 const Habit = mongoose.model('habit', habitSchema)

module.exports = Habit;