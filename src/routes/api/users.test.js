import { request, token } from '../../test/setup-test'

describe('GET /api/users', () => {
    test('should require authorization', (done) => {
        request
            .get('/api/users')
            .expect(403, done)
    })
    
    test('should respond with JSON array', (done) => {
        request
            .get('/api/users')
            .auth(token, { type: 'bearer' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(typeof res.body.count).toEqual('number')
                expect(res.body.rows).toBeInstanceOf(Array)

                done()
            })
    })
})
