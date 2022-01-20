const habitController = require('../../../controllers/habit')
const Habit = require('../../../model/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getHabits', ()=>{
        test('returns 200 on fetching all habits', async ()=>{
            jest.spyOn(Habit, 'all', 'get')
                .mockResolvedValue([{},{},{}])
            await habitController.getHabits(null,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith([{},{},{}]);
        })
        test('returns 500 on error', async ()=>{
            jest.spyOn(Habit, 'all', 'get')
                .mockRejectedValue([])
            await habitController.getHabits(null,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(500);
        })

    })

    describe('getName', ()=>{
        test('returns with code 200 on getting habits by name', async ()=>{
            jest.spyOn(Habit, 'getByName')
                .mockResolvedValue([{},{},{}])
            const mockReq = {params:{name: 'antonio'}}
            await habitController.getByName(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
        test('returns with code 500 on fail', async ()=>{
            jest.spyOn(Habit, 'getByName')
                .mockRejectedValue([])
            const mockReq = {params:{name: 'antonio'}}
            await habitController.getByName(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    })

    describe('create', ()=>{
        test('returns with 201 on creating a new habit ', async ()=>{
            jest.spyOn(Habit, 'createHabit')
                .mockResolvedValue({})
            const mockReq = {params:{username:'mark'}, body: {}}
            await habitController.create(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
    })

    describe('getUserHabits', ()=>{
        test('returns with 201 on updating and getting users habits', async ()=>{
            jest.spyOn(Habit, 'getHabits')
                .mockResolvedValue([{},{},{}] )
            
            const mockReq = {params: {habit_id: 1, username:'troy'}}
            await habitController.getUserHabits(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
        test('returns with 403 on fail', async ()=>{
            jest.spyOn(Habit, 'getHabits')
                .mockRejectedValue([{},{},{}] )
            const mockReq = {params: {habit_id: 1, username:'troy'}}
            await habitController.getUserHabits(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(403);
        })
    })

    describe('getOldHabit', ()=>{
        test(' ', async ()=>{
            jest.spyOn(Habit, 'getOldHabits')
                .mockResolvedValue([])
            
            const mockReq = {params: {id:1}}
            await habitController.getOldHabit(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    })

    describe('updatedHabitCounter', ()=>{
        test('returns 201 on updating a habit and entering to habit_counter', async ()=>{
            jest.spyOn(Habit, 'newHabitEntry')
                .mockResolvedValue({})
            
            const mockReq = {body: {}}
            await habitController.updateHabitCounter(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
    })

    describe('decrement', ()=>{
        test('returns 204 on success', async ()=>{
            jest.spyOn(Habit, 'decrement')
                .mockResolvedValue({})
            const mockReq = {params:{habit_id:1}}
            await habitController.decrement(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(204)
        })
        test('returns 403 on fail', async ()=>{
            jest.spyOn(Habit, 'decrement')
                .mockRejectedValue({})
            const mockReq = {params:{habit_id:1}}
            await habitController.decrement(mockReq,mockRes)
            expect(mockStatus).toHaveBeenCalledWith(403)
        })
    })
})
