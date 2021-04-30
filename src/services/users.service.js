import Joi from 'joi'
import { Op } from '../data-access/sequelize'
import UsersModel from '../models/users.model'

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])')).required(),
    age: Joi.number().integer().min(4).max(130).required()
})

class UsersService {
    constructor() {}

    async list(query) {
        const { loginSubstring, offset = 0, limit = 10 } = query
        const options = {
            offset,
            limit
        }

        if (loginSubstring) {
            options.where = {
                login: {
                    [Op.like]: `%${loginSubstring}%`,
                }
            }
        }

        return await UsersModel.findAndCountAll(options)
    }

    async create(data) {
        return await UsersModel.create({ ...data, isDeleted: false })
    }

    async findByPk(id) {
        return await UsersModel.findByPk(id)
    }

    async update(id, data) {
        return await UsersModel.update({ ...data }, { where: { id } })
    }

    async delete(id) {
        return await UsersModel.update({ isDeleted: true }, { where: { id } })
    }
}

export default new UsersService
