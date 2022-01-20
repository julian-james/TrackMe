const User = require('api/model/User.js');
const Habit = require('api/model/Habit.js');

jest.mock('api/model/Habit.js');

const mongoose = require('mongoose')
jest.mock('mongoose');

const databaseUrl = "mongodb+srv://julian:rhino11@cluster0.bdrta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



// const db = require('../../../db/db');
const db = require('../../integrations/config')

const testUser = {
    // _id: 'testing',
    name: 'test_usr',
    email: 'test@test.com',
    password: '123'
}

const testUser2 = {
    // _id: '3',
    name: 'trackme',
    email: 'trackme@gmail.com',
    password: 'habit'
}

describe('Habit', () =>{
    beforeAll(async () => {
        await mongoose.connect(databaseUrl, { useNewUrlParser: true });
      });

    beforeEach(() => jest.clearAllMocks())
    
    afterEach(async () => {
        await User.deleteMany();
      });

    afterAll(() => jest.resetAllMocks())

    // it("Should save user to database", async done => {
    //     const res = await request.post("/register").send({
    //       name: "Zella Zingly",
    //       email: "testing@email.com",
    //       password: "asdfgh"
    //     });
      
    //     // Searches the user in the database
    //     const user = await User.findOne({ email: "testing@gmail.com" });
      
    //     done();
    //   });

    it("Should save user to database", async done => {
        // Sends request...
      
        // Searches the user in the database
        const user = await User.findOne({ email: "Trent@email.com" });
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
      
        done();
      });

      it("Should save user to database", async done => {
        // Sends request...
      
        // Searches the user in the database...
      
        // Ensures response contains name and email
        expect(res.body.name).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        done();
      });

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
