import express from 'express'
import customLogger from '../../middlewares/custom-logger'
import customTokenVerify from '../../middlewares/custom-token-verify'
import jwt from 'express-jwt'
import cors from 'cors'
import { logger } from '../../config/winston'
import authenticate from './authenticate'
import users from './users'
import groups from './groups'
import { JWT_SECRET, JWT_UNLESS_PATH } from '../../config/jwt'

const router = express.Router()
const routeConfigs = [
    {
        path: '/authenticate',
        routes: authenticate
    },
    {
        path: '/users',
        routes: users
    },
    {
        path: '/groups',
        routes: groups
    }
]

router.use(cors())
router.use(customTokenVerify)
router.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({ path: JWT_UNLESS_PATH }))
router.use(customLogger)

for (const config of routeConfigs) {
    const { path, routes } = config

    router.use(path, routes)
}

router.use((err, req, res, next) => {
    const { originalUrl, method, body } = req
    const bodyString = JSON.stringify(body)
    let errorMessage
    const status = err.status || 400

    if (err.name) {
        errorMessage = err.name
    } else {
        errorMessage = err?.error?.toString()
    }

    const message = `
Method: ${method}
URL: ${originalUrl}
Body: ${bodyString}
Error: ${errorMessage}`

    logger.error(message)

    if (err.name === 'UnauthorizedError' || err.name === 'ForbiddenError') {
        res.status(status).send(errorMessage);
    } else if (err && err.error && err.error.isJoi) {
        res.status(status).json({
            message: errorMessage
        })
    } else {
        next(err)
    }
})

export default router
