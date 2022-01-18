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
        required: true
    },
    Streak: {
        type: Number,
        required: true
    }
}, {collection: "habits"});

const Habit = mongoose.model('habit', habitSchema)

module.exports = Habit;