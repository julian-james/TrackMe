const request = require('supertest')
const auth = require('api/routes/verifyToken.js');
const app = require('api/index.js')

describe('habit endpoints', ()=>{
    let api;
    let habit = {
        HabitName: "Drink Water",
        Frequency: 2,
        Goal: false,
        Streak: 0,
        Progress: 0
    }

    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(3000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })
    
    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /habits with status 200', (done) => {
        request(api).get('/habits').expect(200, done);
    });

    it('responds to post /habits with status 201', (done) => {
        request(api)
            .post('/habits')
            .send(habit)
            .set('Accept', /application\/json/)
            .expect({message: `Habit number ${habit.id} request successfully`}, done);
    });

    it('responds to get /habits/200 with status 404', (done) => {
        request(api).get('/habits/200').expect(404, done);
    });

    it('retrieves a habit by id', (done) => {
        request(api)
            .get('/habits/61e6bf2917b6cedc5d3fab28')
            .expect(200)
            .expect({ id: "61e6bf2917b6cedc5d3fab28",
                HabitName: "Drink Water",
                Frequency:  "2",
                Goal:  "false",
                Streak: "0",
                Progress: "0" }, done);
    });

    it('responds to non existing paths with 404', (done) => {
        request(api).get('/no').expect(404, done);
    });

    it('/:name', async () =>{
        //middleware required
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"
        const res = await request(api)
            .get('/habits/test')
            .set('Authorization','Bearer '+ authToken)
        expect(res.statusCode).toBe(200)
    })

    it('/:username', async ()=>{
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"

       const res = await request(api)
            .post('/habits/test2')
            .set('Authorization','Bearer '+ authToken)
            .send({
                habit:'testing habit',
                frequency: '2'
            })
        expect(res.statusCode).toEqual(201);
    })

    it("/", async () => {
        // Promise resolve
        jest.spyOn(auth, 'verifyToken').mockImplementation((req, res, next) => next());
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"
        const res = await request(api).get('/habits').set('Authorization','Bearer '+ authToken)
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(6)
    })

    it('/habits/:habit_id/:username', async ()=>{
        const res = await request(api)
            .get('/habits/habits/1/test')
        expect(res.statusCode).toEqual(201)
        expect(res.body.length).toEqual(3)
    })

    it('/habits/oldhabits/entries/:id', async ()=>{
        const res = await request(api)
            .get('/habits/habits/oldhabits/entries/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(2)
    })

    it('/:username/habits/entries', async ()=>{
        const res = await request(api)
            .post('/habits/test/habits/entries')
            .send({
                habit_id: 1,
                habit:'testing',
                frequency:2
            })
        expect(res.statusCode).toEqual(201)
    })

    it('deletes habit', async ()=>{
        jest.spyOn(auth, 'verifyToken').mockImplementation((req, res, next) => next());
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"

        const res1 = await request(api)
            .delete('/habits/delete/1')
            .set('Authorization','Bearer '+ authToken)
        
        const res = await request(api)
            .get('/habits')
            .set('Authorization','Bearer '+ authToken)
        expect(res1.statusCode).toBe(202)
        expect(res.body.length).toBe(5)
    })

    it('should decrement completion', async()=>{
        const res = await request(api)
            .delete('/habits/decrement/2')
        
        expect(res.statusCode).toEqual(204)
    })


})
