const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    Habits: {
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
});

const Habit = mongoose.model('habit', habitSchema)

module.exports = Habit;