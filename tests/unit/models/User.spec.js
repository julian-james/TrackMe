const User = require('../../../model/User');
const Habit = require('../../../model/Habit');

jest.mock('../../../model/Habit');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../db/db');

const testUser = {
    user_id: 'testing',
    username: 'test_usr',
    email: 'test@test.com',
    usr_password: '123'
}

const testUser2 = {
    user_id: '3',
    username: 'trackme',
    email: 'trackme@gmail.com',
    usr_password: 'habit'
}

describe('Habit', () =>{
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', ()=>{
        test('resolves all users on success', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{}, {}, {}]})
            const result = await User.all;
            expect(result).toHaveLength(3)
        })
        test('error', async ()=>{
            return User.all.catch(e=>{
                expect(e).toBe('User not found!')
            })
        })
    })

    describe('exists', ()=>{
        test('resolves user if it exists in db', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: testUser})
            const result = await User.exists(testUser.username)
            expect(result.rows).toHaveProperty('user_id', 'testing');
        })
        test('error', async ()=>{
            return User.exists('hello').catch(e=>{
                expect(e).toBe('Cannot find if user exists or not')
            })
        })
        
    })

    describe('register', ()=>{
        test('resolves all users', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows:{}})
                .mockResolvedValueOnce({rows:{}})
                .mockResolvedValueOnce({rows: [testUser2]})
            const result = await User.register(testUser2.username, testUser2.email, testUser2.usr_password)
            expect(result).toHaveProperty('user_id', '3');
        })
        test('user exists', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows:[1]})
                .mockResolvedValueOnce({rows:{}})
            return User.register(testUser2.username, testUser2.email, testUser2.usr_password).catch(e=>{
                expect(e).toBe('User already exists!')
            })
        })
    })

    describe('findByEmail', ()=>{
        test('resolves all users', async () =>{
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [testUser]})
            const result = await User.findByEmail(testUser.username, testUser.email, testUser.usr_password)
            expect(result).toHaveProperty('user_id', 'testing');
        })
    })
})
