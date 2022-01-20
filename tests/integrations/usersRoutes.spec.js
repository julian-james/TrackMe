const app = require('api/index.js')
const request = require('supertest')
const db = require('./config')

describe('habit endpoints', ()=>{
    let api;

    beforeAll(async () => await db.connect())
    afterEach(async () => await db.clearDatabase())
    afterAll(async () => await db.closeDatabase())

    // beforeEach(async () => {
    //     await resetTestDB()
    // });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    // afterAll(async () => {
    //     console.log('Gracefully stopping test server')
    //     await api.close()
    // })

    it('/', async ()=>{
        const res = await request(api)
            .get('/')

        expect(res.statusCode).toBe(200)
        expect(res.body.length).toEqual(3)
    })

    it('/exists/:name', async ()=>{
        let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"

        const res = await request(api)
            .get('/exists/test')
            .set('Authorization','Bearer '+ authToken)
        
        expect(res.statusCode).toBe(201)
        //expect(res.text.msg).toBe('User found')
    })

})
