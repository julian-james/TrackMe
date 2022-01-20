const mockSend = jest.fn();
const mockJson = jest.fn();
const mockNext = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

const jwt = require('jsonwebtoken')
const auth = require('api/routes/verifyToken.js')

//need to come back to this
describe('verifyToken', ()=>{
    test('verifies token', async ()=>{
        const mockReq = {headers:{Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjM5NTgyNTc2fQ.Rocg5YEBb0LeddFAi6FEXkZCbCabwu4dVn0QC-yUPtw"}}
        auth(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200)
    })
    test('fails verification', async ()=>{
        const mockReq = {headers:{authorization: "hello"}}
        auth(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(403)
    })
})
