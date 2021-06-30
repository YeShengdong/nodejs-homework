import 'regenerator-runtime/runtime'
import app from '../app'
import supertest from 'supertest'

const request = supertest(app)
let token

beforeAll((done) => {
    request
        .post('/api/authenticate')
        .send({ login: 'admin0', password: 'admin0' })
        .expect(200)
        .end((err, res) => {
            token = res.body
            done()
        })
})

export {
    request,
    token
}