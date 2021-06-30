import express from 'express'
import { logger } from './config/winston'
import createError from 'http-errors'
import apiRoutes from './routes/api'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('Internal Server Error')
})

process.on('uncaughtException', (err) => {
    logger.error(err);
})
 
process.on('unhandledRejection', (error, promise) => {
    logger.error('Unhandled Rejection at:', promise);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
