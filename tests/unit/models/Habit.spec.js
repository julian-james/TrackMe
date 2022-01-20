// const User = require('../../../model/User');
// const Habit = require('../../../model/Habit');
const User = require('api/model/User.js');
const Habit = require('api/model/Habit.js')



jest.mock('api/model/User.js');

const mongoose = require('mongoose')
jest.mock('mongoose');

const databaseUrl = "mongodb+srv://julian:rhino11@cluster0.bdrta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const db = require('../../../db/db');
const db = require('../../integrations/config')
  

const user = {
    user_id: 10,
    username: 'test1',
    emai: 'test1@test.com',
    usr_password: 'testing'
};
const habits = [
    {                
        habit_id: 1,
        habit: 'test_habit',
        user_id: 10,
        currTime: 'current time',
        currfreq: 3,
        frequency: 4
    },
    {                
        habit_id: 2,
        habit: 'test_habit2',
        user_id: 10,
        currTime: 'current time',
        currfreq: 1,
        frequency: 2
    },

]

describe('Habit', () =>{

    beforeAll(async () => await db.connect())
    afterEach(async () => await db.clearDatabase())
    afterAll(async () => await db.closeDatabase())

    // beforeAll(async () => {
    //     await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    //   });

    // beforeEach(() => jest.clearAllMocks())
    
    // afterAll(() => jest.resetAllMocks())

    describe('all', ()=>{
        test('resolves with habits on successful db query', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
        test('error', async ()=>{
            return Habit.all.catch(e=>{
                expect(e).toBe('Error retrieving habits')
            })
        })
    })

    describe('getByName', () =>{
        test('', async () =>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: habits});
            let testUser = new User(user);
            const result = await Habit.getByName(testUser.username);
            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('habit', 'test_habit')
        })
        test('error', async ()=>{
            return Habit.getByName('whatever').catch(e=>{
                expect(e).toBe('Error getting name')
            })
        })

    })

    describe('createHabit', () =>{
        test('resolves with habit on successful query', async () =>{
            let habitData = {     
                habit: 'test_habit',
                frequency: 4
            }
            
            jest.spyOn(db, `query`)
                .mockResolvedValueOnce({rows: 'test'})
                .mockResolvedValueOnce({rows: [{...habitData, habit_id:1 }] })
            const result = await Habit.createHabit(habitData);
            expect(result).toHaveProperty('habit_id')
        })
        test('error', async ()=>{
            return Habit.createHabit('whatever').catch(e=>{
                expect(e).toBe('Error creating habit')
            })
        })
    })

    describe('newHabitEntry', () =>{
        test('doesnt go into brnaches', async () =>{
            jest.spyOn(db, 'query')
                //max frequncy
                .mockResolvedValueOnce({rows:[{frequency:5}]}) 
                //insert
                .mockResolvedValueOnce({})
                //numofEntries
                .mockResolvedValueOnce({rows:[ { count: 2 } ] })
            const result = await Habit.newHabitEntry(habits[0])
            expect(result).toBe('completion inserted to table');
        })

        test('goes into first branch', async()=>{
            jest.spyOn(db, 'query')
                //max frequncy
                .mockResolvedValueOnce({rows:[{frequency:5}]})
                //insert
                .mockResolvedValueOnce({})
                //numofEntries
                .mockResolvedValueOnce({rows:[ { count: 1 } ] })
                .mockResolvedValueOnce({rows: [{count: 1}]})
                .mockResolvedValueOnce({})
            const result = await Habit.newHabitEntry(habits[0])
            expect(result).toBe('completion inserted to table');
        })

        test('goes into second branch', async()=>{
            jest.spyOn(db, 'query')
                //max frequncy
                .mockResolvedValueOnce({rows:[{frequency:5}]}) 
                //insert
                .mockResolvedValueOnce({})
                //numofEntries
                .mockResolvedValueOnce({rows:[ { count: 5 } ] })
                .mockResolvedValueOnce({})
            const result = await Habit.newHabitEntry(habits[0])
            expect(result).toBe('completion inserted to table');
        })
        test('error', async ()=>{
            return Habit.newHabitEntry(habits[0])
                .catch(e => expect(e).toEqual('err'))
        })
    })

    describe('getHabits', () =>{
        test('goes throug all branches', async ()=>{
            jest.spyOn(db,'query')
                //user_id
                .mockResolvedValueOnce({rows:[{user_id:1}]})
                //userhabitId
                .mockResolvedValueOnce({rows:[{habit_id:1}]})
                //completionhabit
                .mockResolvedValueOnce({rows:[{count:0}]})
                //habits
                .mockResolvedValueOnce({rows:[{count:2}]})
                //frequency
                .mockResolvedValueOnce({rows:[{frequency:2}]}) 
                //current streak
                .mockResolvedValueOnce({rows:[{currstreak:3}]}) 
                //max streak
                .mockResolvedValueOnce({rows:[{maxstreak:2}]}) 
                //streak update
                .mockResolvedValueOnce({})
                //max streak update
                .mockResolvedValueOnce({}) 
                //update
                .mockResolvedValueOnce({})
                //getuser
                .mockResolvedValueOnce({rows:[{user_id:1}]})
                // get data
                .mockResolvedValueOnce({rows:[habits[0]]})
            const result = await Habit.getHabits(1,'test')
            expect(result.rows[0]).toHaveProperty('habit_id')
        })

        test('throws error', async ()=>{
            return Habit.getHabits(1,'test')
                .catch(e => expect(e).toBe('couldnt get habbits'))
        })
    })

    describe('decrement', () =>{
        test('decrements successfully', async ()=>{
            jest.spyOn(db,'query')
                //current frequency
                .mockResolvedValueOnce({rows:[{currfreq:2, frequency:2}]})
                //update
                .mockResolvedValueOnce({})
                //decrement
                .mockResolvedValueOnce({rowCount:2})
            const result = await Habit.decrement(1)
            expect(result).toBe('1 was decremented!')
        })
        test('fails to decrement', async ()=>{
            jest.spyOn(db,'query')
                //current frequency
                .mockResolvedValueOnce({rows:[{currfreq:2, frequency:2}]})
                //update
                .mockResolvedValueOnce({})
                //decrement
                .mockResolvedValueOnce({rowCount:0})
            const result = await Habit.decrement(1)
            expect(result).toBe('1 could not be decremented!')
        })
        test('error', async ()=>{
            return Habit.decrement(1).catch(e=>{
                expect(e).toBe('cannot decrement the counter, try again')
            })
        })
    }) 

    describe('getOldHabits', () =>{
        test('diff = undefined', async () =>{
            jest.spyOn(db, 'query')
                //days
                .mockResolvedValueOnce({rows:[{date_trunc:{}}]})
                //daybefore
                .mockResolvedValueOnce({rows:[{count: 3}]})
                //day2
                .mockResolvedValueOnce({rows:[{count: 4}]})
                //day3
                .mockResolvedValueOnce({rows:[{count: 5}]})
            const result = await Habit.getOldHabits(1);
            expect(result).toHaveLength(0)
        })
        test('diff = 1', async () =>{
            jest.spyOn(db, 'query')
                //days
                .mockResolvedValueOnce({rows:[{date_trunc:{days:1}}]})
                //daybefore
                .mockResolvedValueOnce({rows:[{count: 3}]})
                //day2
                .mockResolvedValueOnce({rows:[{count: 4}]})
                //day3
                .mockResolvedValueOnce({rows:[{count: 5}]})
            const result = await Habit.getOldHabits(1);
            expect(result).toHaveLength(1)
        })
        test('diff = 2', async () =>{
            jest.spyOn(db, 'query')
                //days
                .mockResolvedValueOnce({rows:[{date_trunc:{days:2}}]})
                //daybefore
                .mockResolvedValueOnce({rows:[{count: 3}]})
                //day2
                .mockResolvedValueOnce({rows:[{count: 4}]})
                //day3
                .mockResolvedValueOnce({rows:[{count: 5}]})
            const result = await Habit.getOldHabits(1);
            expect(result).toHaveLength(2)
        })
        test('diff = 3', async () =>{
            jest.spyOn(db, 'query')
                //days
                .mockResolvedValueOnce({rows:[{date_trunc:{days:3}}]})
                //daybefore
                .mockResolvedValueOnce({rows:[{count: 3}]})
                //day2
                .mockResolvedValueOnce({rows:[{count: 4}]})
                //day3
                .mockResolvedValueOnce({rows:[{count: 5}]})
            const result = await Habit.getOldHabits(1);
            expect(result).toHaveLength(3)
        })
    
        test('error', async () =>{
            return Habit.getOldHabits(1).catch(e=>{
                expect(e).toBe('error occured')
            })
        })
    })
})
