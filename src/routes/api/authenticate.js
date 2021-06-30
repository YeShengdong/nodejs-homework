import express from 'express'
import { createValidator } from 'express-joi-validation'
import usersService, { loginSchema } from '../../services/users.service'

const router = express.Router()
const validator = createValidator({ passError: true })

router
    .route('/')
    .post(validator.body(loginSchema), async (req, res) => {
        const { login, password } = req.body
        const token = await usersService.login(login, password)

        if (token) {
            res.json(token)
        } else {
            res.status(401).send('Bad username/password')
        }
    })

export default router
