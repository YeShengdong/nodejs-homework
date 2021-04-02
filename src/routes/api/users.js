import express from 'express'
import { createValidator } from 'express-joi-validation'
import users, { userSchema } from '../../services/users.service'

const router = express.Router()
const validator = createValidator({ passError: true })

router
    .route('/')
    .get((req, res) => {
        res.json(users.list(req.query))
    })
    .post(validator.body(userSchema), (req, res) => {
        res.json(users.create(req.body))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params

        res.json(users.find(id))
    })
    .put(validator.body(userSchema), (req, res) => {
        const {
            params: {
                id
            },
            body
        } = req

        res.json(users.update(id, body))
    })
    .delete((req, res) => {
        const { id } = req.params

        res.json(users.delete(id))
    })

export default router
