import express from 'express'
import users from './users'

const router = express.Router()
const routeConfigs = [
    {
        path: '/users',
        routes: users
    }
]

for (const config of routeConfigs) {
    const { path, routes } = config

    router.use(path, routes)
}

router.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            message: err.error.toString()
        })
    } else {
        next(err)
    }
})

export default router
