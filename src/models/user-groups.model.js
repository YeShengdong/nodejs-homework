import { sequelize, DataTypes } from '../data-access/sequelize'
import UsersModel from './users.model'
import GroupsModel from './groups.model'

const UserGroupsModel = sequelize.define('userGroups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

UsersModel.belongsToMany(GroupsModel, {
    through: UserGroupsModel,
})

GroupsModel.belongsToMany(UsersModel, {
    through: UserGroupsModel,
})

export default UserGroupsModel
