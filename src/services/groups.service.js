import Joi from 'joi'
import { sequelize } from '../data-access/sequelize'
import GroupsModel, { permissionRegex } from '../models/groups.model'
import UserGroupsModel from '../models/user-groups.model'

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().regex(permissionRegex).required())
})

class GroupsService {
    constructor() { }

    async list(query) {
        const { offset = 0, limit = 10 } = query
        const options = {
            offset,
            limit
        }

        return await GroupsModel.findAndCountAll(options)
    }

    async create(data) {
        return await GroupsModel.create({ ...data })
    }

    async findByPk(id) {
        return await GroupsModel.findByPk(id)
    }

    async update(id, data) {
        return await GroupsModel.update({ ...data }, { where: { id } })
    }

    async delete(id) {
        return await GroupsModel.destroy({ where: { id } })
    }

    async addUsersToGroup(id, userIds = []) {
        const transaction = await sequelize.transaction()

        try {
            const createRequests = [];

            for (let item of userIds) {
                const data = {
                    groupId: id,
                    userId: item
                }

                createRequests.push(await UserGroupsModel.create(data, { transaction }))
            }

            await Promise.all(createRequests)

            return await transaction.commit()
        } catch(error) {
            return await transaction.rollback()
        }
    }
}

export default new GroupsService
