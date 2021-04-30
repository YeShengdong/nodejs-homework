import express from 'express'
import { createValidator } from 'express-joi-validation'
import usersService, { userSchema } from '../../services/users.service'

const router = express.Router()
const validator = createValidator({ passError: true })

router
    .route('/')
    .get(async (req, res) => {
        const data = await usersService.list(req.query)

        res.json(data)
    })
    .post(validator.body(userSchema), async (req, res) => {
        const user = await usersService.create(req.body)

        res.status(201).json(user)
    })

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const user = await usersService.findByPk(id)

        res.json(user)
    })
    .put(validator.body(userSchema), async (req, res) => {
        const {
            params: {
                id
            },
            body
        } = req

        await usersService.update(id, body)

        const user = await usersService.findByPk(id)

        res.json(user)
    })
    .delete(async (req, res) => {
        const { id } = req.params

        await usersService.delete(id)
        res.status(204).end()
    })

export default router
