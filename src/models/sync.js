/* eslint-disable no-unused-vars */

import { sequelize } from '../data-access/sequelize'
import UsersModel from '../models/users.model'
import GroupsModel from './groups.model'
import UserGroupsModel from './user-groups.model'

const createPredefinedUsers = async (number = 1) => {
    for (let i = 0; i < number; i++) {
        const user = {
            login: `admin${i}`,
            password: `admin${i}`,
            age: i + 20
        }

        await UsersModel.create(user)
    }
}

const createPredefinedGroups = async (number = 1) => {
    for (let i = 0; i < number; i++) {
        const user = {
            name: `group${i}`,
            permissions: ['READ', 'WRITE', 'DELETE']
        }

        await GroupsModel.create(user)
    }
}

(async () => {
    try {
        await sequelize.sync({ force: true })
        await createPredefinedUsers(5)
        await createPredefinedGroups(2)

        console.log('All models were synchronized successfully.')
    } catch (error) {
        console.log('synchronized failed.', error)
    }
})()
