import express from 'express'
import { createValidator } from 'express-joi-validation'
import groupsService, { groupSchema } from '../../services/groups.service'

const router = express.Router()
const validator = createValidator({ passError: true })

router
    .route('/')
    .get(async (req, res) => {
        const data = await groupsService.list(req.query)

        res.json(data)
    })
    .post(validator.body(groupSchema), async (req, res) => {
        const data = await groupsService.create(req.body)

        res.status(201).json(data)
    })

router
    .route('/:id/users')
    .post(async (req, res) => {
        const { id } = req.params
        const { userIds } = req.body;
        const data = await groupsService.addUsersToGroup(id, userIds)

        res.status(201).json(data)
    })

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const data = await groupsService.findByPk(id)

        res.json(data)
    })
    .put(validator.body(groupSchema), async (req, res) => {
        const {
            params: {
                id
            },
            body
        } = req

        await groupsService.update(id, body)

        const data = await groupsService.findByPk(id)

        res.json(data)
    })
    .delete(async (req, res) => {
        const { id } = req.params

        await groupsService.delete(id)
        res.status(204).end()
    })

export default router
