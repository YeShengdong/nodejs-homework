import createError from 'http-errors'
import { JWT_UNLESS_PATH } from '../config/jwt'

export default (req, res, next) => {
    const { originalUrl, headers } = req
    const token = headers['authorization']

    if (!token && !JWT_UNLESS_PATH.includes(originalUrl)) {
        next(createError(403))
    } else {
        next()
    }
}
