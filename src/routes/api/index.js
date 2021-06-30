import express from 'express'
import customLogger from '../../middlewares/custom-logger'
import { logger } from '../../config/winston'
import users from './users'
import groups from './groups'

const router = express.Router()
const routeConfigs = [
    {
        path: '/users',
        routes: users
    },
    {
        path: '/groups',
        routes: groups
    }
]

router.use(customLogger)

for (const config of routeConfigs) {
    const { path, routes } = config

    router.use(path, routes)
}

router.use((err, req, res, next) => {
    const { originalUrl, method, body } = req
    const bodyString =  JSON.stringify(body)
    const message = `
Method: ${method}
URL: ${originalUrl}
Body: ${bodyString}`

    logger.error(message)

    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            message: err.error.toString()
        })
    } else {
        next(err)
    }
})

export default router
