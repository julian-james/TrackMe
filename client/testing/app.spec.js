const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock');

let app;

describe('Creation habit', () => {
    

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        evt =  { preventDefault: jest.fn()}
        app = require('../js/content.js')
        data = {
            "habit_id": 3,
            "user_id": 1,
            "habitGoal": "have a drink",
            "HabitStreak": 1,
            "frequency": 1
            "progressNumber": 0,
        }
        
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    it("create a habit", async () => {
        await app.createHabit(data)
       
    })
})
    

        
